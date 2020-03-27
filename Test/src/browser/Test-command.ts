import { inject, injectable } from "inversify";
import { CommandContribution, CommandRegistry } from "@theia/core";
import { OpenerService } from "@theia/core/lib/browser";
import { TestURI, TestOpenHandler } from "./Test-open-handler";

@injectable()
export class TestCommand implements CommandContribution {
    @inject(OpenerService) openerService: OpenerService
    @inject(TestOpenHandler) testOpenHandler: TestOpenHandler

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand({
            id: "widget:test",
            label: "Test Widget",
        }, {
            execute: () => {
                this.testOpenHandler.open(TestURI.toUri(''), {
                    widgetOptions: {
                        area: "main"
                    }
                })
                // open(this.openerService, TestURI.toUri(''), {
                //     area: "main"
                // })
            }
        })
    }

}