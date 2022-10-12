import { Modal } from 'antd';
import React, { useState , useEffect } from 'react';

export function GameRules() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    /*const showModal = () => {
        setIsModalOpen(true);
    };*/

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(()=> {
        setIsModalOpen(true);
    }, []);

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}
