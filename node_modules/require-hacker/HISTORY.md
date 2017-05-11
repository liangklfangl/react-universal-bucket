3.0.0 / 13.03.2017
==================

  * Inside `global_hook` the `resolve()` function must now return an object `{ source, path }` (or `undefined`). The reason is that earlier it could pass a relative path to `resolve()` and then use that relative path when it should have used the absolute one. Therefore the `path` returned as part of the aforementioned object must be an absolute one.

2.1.3 / 05.12.2015
==================

  * Added ".resolver()" method

2.0.3, 2.1.0 / 07.11.2015
==================

  * "precede_node_loader" option is now true by default
  * Added "module" parameter to resolving functions
  * Added "resolve" method

2.0.0, 2.0.1, 2.0.2 / 06.11.2015
==================

  * Some API changes: renamed `.resolver()` to `.global_hook()`, added a static `.to_javascript_module_source()` function
  * All methods are now static and it's no more a class

1.2.1, 1.2.2, 1.2.3 / 04.11.2015
==================

  * Less exclamative extension loader override warning (is now a debug message)

1.2.0 / 03.11.2015
==================

  * Fixed require() cache not being flushed when using .resolver()
  * Flushing require() cache on .unmount()

1.1.0 / 02.11.2015
==================

  * Added "precede_node_loader" option for .resolver()

1.0.0 / 02.11.2015
==================

  * Initial release