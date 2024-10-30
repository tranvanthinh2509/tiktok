import React from 'react';
const { Spin } = require('antd');

function NewLoading({ isLoading, delay = 200, ...props }) {
    return (
        <div {...props}>
            <div className="fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center bg-white">
                <Spin size="large" tip="Loading" spinning={isLoading} delay={delay}></Spin>
            </div>
        </div>
    );
}

export default NewLoading;
