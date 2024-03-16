module.exports = {
    scanSource: [{                                                          // 必须，待扫描源码的配置信息
        name: 'react_project',                                                                // 必填，项目名称
        path: ['src'],                                                                    // 必填，需要扫描的文件路径（基准路径为配置文件所在路径）
        packageFile: 'package.json',                                                      // 可选，package.json 文件路径配置，用于收集依赖的版本信息
    }],                                                                 
    analysisTarget: 'antd',                                            // 必须，要分析的目标依赖名
    analysisPlugins: [],                                                    // 可选，自定义分析插件，默认为空数组，一般不需要配置
    blackList: ['message'],                   // 可选，需要标记的黑名单api，默认为空数组
    reportDir: 'docs',                                                      // 可选，生成代码分析报告的目录，默认为'report',不支持多级目录配置
    reportTitle: 'react_project代码分析报告',                                    // 可选，代码分析报告标题，默认为'代码依赖分析报告'
    scorePlugin: 'true',                                                 // 可选，评分插件: Function|'default'|null, default表示运行默认插件，默认为null表示不评分
    // scorePlugin: myScoreDeal,
    alarmThreshold: 90                                                      // 可选，开启代码告警及阈值分数(0-100)，默认为null即关闭告警逻辑 (CLI模式生效)
}
