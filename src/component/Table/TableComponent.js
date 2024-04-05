import { Divider, Radio, Table } from 'antd';
import React, { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { CiEdit } from 'react-icons/ci';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', videos = [], isLoading = false } = props;
    const data =
        videos?.length &&
        videos?.map((video) => {
            return { ...video, key: video._id };
        });
    const renderAction = () => {
        return (
            <div className="flex">
                <CiTrash fontSize="24px" className="cursor-pointer" />
                <CiEdit fontSize="24px" className="ml-2 cursor-pointer" />
            </div>
        );
    };
    const columns = [
        {
            title: 'Chú thích',
            dataIndex: 'description',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
        },
        {
            title: 'Thời gian tạo',
            dataIndex: 'createdAt',
        },
        {
            title: 'Video',
            dataIndex: 'video2',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: renderAction,
        },
    ];

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
            />
        </div>
    );
};
export default TableComponent;
