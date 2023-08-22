#include "node_xml2json.h"

static inline const char* get_xml_string(napi_env env, napi_value* argv) {
  size_t xml_string_size;
  napi_get_value_string_utf8(
      env, argv[0], NULL, 0,
      // Number of bytes copied into the buffer, excluding the null terminator.
      &xml_string_size);
  // Now, let's increase the size for the null terminator.
  xml_string_size += 1;
  char* xml_string = new char[xml_string_size]();
  napi_get_value_string_utf8(env, argv[0], xml_string, xml_string_size, NULL);
  return xml_string;
}

napi_value xml2json(napi_env env, napi_callback_info info) {
  size_t argc = 1;
  napi_value argv[1];
  napi_get_cb_info(env, info, &argc, argv, NULL, NULL);

  napi_valuetype xml_string_type;
  napi_typeof(env, argv[0], &xml_string_type);
  if (xml_string_type != napi_string) {
    napi_throw_error(env, NULL, "xml should be a string");
    return nullptr;
  }

  const char* xml_string = get_xml_string(env, argv);

  try {
    napi_value result;
    napi_create_string_utf8(env, xml2json(xml_string).c_str(), NAPI_AUTO_LENGTH,
                            &result);
    return result;
  } catch (const rapidxml::validation_error& validation_error) {
    std::string message =
        "xml2json validation error: " + std::string(validation_error.what());
    napi_throw_error(env, NULL, message.c_str());
    return nullptr;
  } catch (const rapidxml::parse_error& parse_error) {
    std::string message =
        "xml2json parse error: " + std::string(parse_error.what());
    napi_throw_error(env, NULL, message.c_str());
    return nullptr;
  }
}

napi_value init(napi_env env, napi_value exports) {
  napi_value xml2json_fn;
  napi_create_function(env, NULL, NAPI_AUTO_LENGTH, xml2json, NULL,
                       &xml2json_fn);
  napi_set_named_property(env, exports, "xml2json", xml2json_fn);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
