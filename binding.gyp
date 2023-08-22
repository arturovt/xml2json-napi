{
  'variables': {
    'openssl_fips': '0'
  },
  'targets': [
    {
      'target_name': 'node_xml2json',
      'include_dirs': ['libxml2json/include'],
      'defines': ['NDEBUG'],
      'sources': [
        'libxml2json/include/xml2json.hpp',
        'src/node_xml2json.h',
        'src/node_xml2json.cc'
      ],
      'cflags_cc': ['-std=c++17', '-fexceptions', '-O3', '-Wall', '-Wextra'],
      'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
      'conditions': [
        ['OS == "mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          }
        }]
      ]
    }
  ]
}
