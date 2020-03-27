import { injectable } from "inversify";
import { WidgetOpenHandler, WidgetOpenerOptions } from "@theia/core/lib/browser";
import { TestWidget } from "./Test-widget";
import URI from "@theia/core/lib/common/uri";
import { MaybePromise } from "@theia/core";

export namespace TestURI {
    export const scheme = "test";

    export function toUri(string: string): URI {
        return new URI('').withScheme(scheme).withFragment(string);
    }

    export function fromUri(uri: URI): string {
        if (uri.scheme === scheme) {
            return uri.fragment;
        }
        throw new Error('The given uri is not a valid URI, uri: ' + uri);
    }
}

@injectable()
export class TestOpenHandler extends WidgetOpenHandler<TestWidget> {
    readonly id = TestWidget.ID;
    
    canHandle(uri: URI, options?: WidgetOpenerOptions): MaybePromise<number> {
        if(TestURI.fromUri(uri)) {
            return 100;
        }
        return 0;
    }

    protected createWidgetOptions(uri: URI, options: WidgetOpenerOptions): Object {
        return options;
    }
}