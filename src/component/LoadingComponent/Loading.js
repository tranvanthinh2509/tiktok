const { Spin } = require('antd');

function Loading({ children, isLoading, delay = 200, ...props }) {
    return (
        <div {...props}>
            <Spin spinning={isLoading} delay={delay}>
                {children}
            </Spin>
        </div>
    );
}

export default Loading;
