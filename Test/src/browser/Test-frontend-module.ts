import { ContainerModule } from 'inversify';
import { TestWidget } from './Test-widget';
import { WidgetFactory, OpenHandler } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';
import { TestOpenHandler } from './Test-open-handler';
import { CommandContribution } from '@theia/core';
import { TestCommand } from './Test-command';

export default new ContainerModule(bind => {
    bind(TestOpenHandler).toSelf();
    bind(OpenHandler).toService(TestOpenHandler);
    bind(TestWidget).toSelf();
    bind(CommandContribution).to(TestCommand);
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TestWidget.ID,
        createWidget: () => ctx.container.get<TestWidget>(TestWidget)
    })).inSingletonScope();
});
