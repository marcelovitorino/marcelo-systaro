import {Aurelia, PLATFORM} from 'aurelia-framework';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "bootstrap/dist/js/bootstrap.min.js";


export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-dialog"), (config) => {
			config.useDefaults();
		})
    .developmentLogging();

  aurelia.start().then(async () => {
    await aurelia.setRoot(PLATFORM.moduleName("app"));
  });
}
