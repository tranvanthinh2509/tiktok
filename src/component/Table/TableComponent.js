import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react';

import UpdateInfoVideo from '../UpdateInfoVideo/UpdateInfoVideo';
const TableComponent = (props) => {
    const { selectionType = 'checkbox', videos = [], isLoading = false, columns } = props;

    const data =
        videos?.length &&
        videos?.map((video) => {
            return { ...video, key: video._id };
        });

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    );
};
export default TableComponent;
