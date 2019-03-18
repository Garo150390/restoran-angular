import {__assign} from 'tslib';
import { tap } from 'rxjs/operators';

export function OverrideLocalizeChamgeLanguage (lang) {
  const _this = this;
  if (lang !== this.parser.currentLang) {
    const rootSnapshot_1 = this.router.routerState.snapshot.root;
    this.parser.translateRoutes(lang)
      .pipe(
        // set new routes to router
        tap(function () { return _this.router.resetConfig(_this.parser.routes); }))
      .subscribe(function () {
        const urlSegments = _this.traverseSnapshot(rootSnapshot_1, true)
          .filter(function (path, i) {
            if (typeof path === 'object') {
              return false;
            }
            return !i || path; // filter out empty paths
          }).map(function (item, i) {
            if (i !== 0) {
              return item.split('/');
            }
            return item;
          });
        const navigationExtras = __assign({},
          rootSnapshot_1.queryParamMap.keys.length
            ? { queryParams: rootSnapshot_1.queryParams }
            : {}, rootSnapshot_1.fragment
            ? { fragment: rootSnapshot_1.fragment }
            : {});
        // use navigate to keep extras unchanged
        _this.router.navigate(urlSegments.flat(), navigationExtras);
      });
  }
}
