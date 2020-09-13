/**
 * 短时间格式
 */
function shortDay(): string {
    const date: Date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ms = date.getMilliseconds();
    return `${h}:${m}:${s}.${ms}`;
}


/**
 * 日志等级枚举
 * @enum {number}
 */
export enum E_Log_Level {
    Trace = 0,
    Debug,
    Info,
    Warn,
    Error,
    Silence
}

// console方法
// tslint:disable-next-line:variable-name
const __ConsoleMethod__: string[] = ["trace", "log", "warn", "error"];
// tslint:disable-next-line:variable-name
const __ConsoleMethodName__ = ["追踪", "日志", "警告", "错误"];
// tslint:disable-next-line:variable-name
const __ConsoleMethodColor__ = ["#cbd", "#afa", "#ff5", "#f88"];
// tslint:disable-next-line:variable-name
const __CallChains__ = [E_Log_Level.Trace, E_Log_Level.Warn, E_Log_Level.Error];

/**
 * 等级日志
 * @description 低于设定等级的日志不会被输出
 * @class
 * @example
 * Logger.setLevel(E_Log_Level.Info);
 * let groups = [[1,2,3,4],{a:1,b:2,c: 3}];
 * Logger.trace("trace", ...groups);
 * Logger.info("info", ...groups);
 * Logger.warn("warn", ...groups);
 * Logger.error("error", ...groups);
 */
class Logger {
    private constructor() { }

    /** 当前日志等级 */
    private static CURRENT_LOG_LEVEL: E_Log_Level = E_Log_Level.Trace;

    /**
     * 设置日志等级
     * @param level
     */
    public static setLevel(level: E_Log_Level) {
        this.CURRENT_LOG_LEVEL = level;
    }

    /**
     * 获得日志等级
     * @returns LOG_LEVEL
     */
    public static getLevel(): E_Log_Level {
        return this.CURRENT_LOG_LEVEL;
    }

    /**
     * 是否完全开放
     * @returns boolean
     */
    public static isFullOpen(): boolean {
        return this.CURRENT_LOG_LEVEL === E_Log_Level.Trace;
    }

    /**
     * 是否全部关闭
     * @returns boolean
     */
    public static isSilence(): boolean {
        return this.CURRENT_LOG_LEVEL === E_Log_Level.Silence;
    }

    /**
     * 根据日志等级判定是否可用
     * @param level 日志等级
     */
    private static isValid(level: E_Log_Level): boolean {
        return !this.isSilence() && level >= this.CURRENT_LOG_LEVEL;
    }

    /**
     * 输出日志内容
     * @param level 日志等级
     * @param label 分组标签
     * @param groups 分组数据
     */
    private static applyGroup(level: E_Log_Level, label: string, ...groups: any) {
        if (!this.isValid(level)) {
            return;
        }

        // 渲染日志前置标记
        const color = __ConsoleMethodColor__[level];
        const args = [
            `%c${label} %c${shortDay()}`,
            `font-weight:bold;background:${color};`,
            `font-weight:bold;background:#ffb;`
        ];

        // 输出日志内容
        const groupMethod =
            label.length === 0 || label.indexOf("@") >= 0
                ? "group"
                : "groupCollapsed";
        console[groupMethod](...args);
        for (const group of groups) {
            // tslint:disable-next-line:no-console
            console.log(group);
        }
        if (__CallChains__.includes(level)) {
            switch (__ConsoleMethod__[level]) {
                case "trace":
                    // tslint:disable-next-line:no-console
                    console.trace("调用链回溯");
                    break;
                case "log":
                    // tslint:disable-next-line:no-console
                    console.log("调用链回溯");
                case "warn":
                    // tslint:disable-next-line:no-console
                    console.warn("调用链回溯");
                    break;
                case "error":
                    // tslint:disable-next-line:no-console
                    console.error("调用链回溯");
            }
        }
        // tslint:disable-next-line:no-console
        console.groupEnd();
    }

    /**
     * 打印跟踪日志
     * @param args
     */
    public static trace(label: string, ...args: any): void {
        // tslint:disable-next-line:no-unused-expression
        this.isValid(E_Log_Level.Trace) &&
            this.applyGroup(E_Log_Level.Trace, label, ...args);
    }

    /**
     * 打印调试日志
     * @param args
     */
    public static debug(label: string, ...args: any): void {
        // tslint:disable-next-line:no-unused-expression
        this.isValid(E_Log_Level.Debug) &&
            this.applyGroup(E_Log_Level.Debug, label, ...args);
    }

    /**
     * 打印信息日志
     * @param args
     */
    public static info(label: string, ...args: any): void {
        // tslint:disable-next-line:no-unused-expression
        this.isValid(E_Log_Level.Info) &&
            this.applyGroup(E_Log_Level.Info, label, ...args);
    }

    /**
     * 打印警告日志
     * @param args
     */
    public static warn(label: string, ...args: any): void {
        // tslint:disable-next-line:no-unused-expression
        this.isValid(E_Log_Level.Warn) &&
            this.applyGroup(E_Log_Level.Warn, label, ...args);
    }

    /**
     * 打印错误日志
     * @param args
     */
    public static error(label: string, ...args: any): void {
        // tslint:disable-next-line:no-unused-expression
        this.isValid(E_Log_Level.Error) &&
            this.applyGroup(E_Log_Level.Error, label, ...args);
    }
}

export { Logger };