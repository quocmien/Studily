import React, { useState } from 'react';
import { Button, Form, Input, Radio, Modal, Upload, UploadFile, UploadProps, GetProp } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ResignNFT from '../api/ResignNFT'

interface NFT {
  title: string,
  image: string,
  id: any
}

interface IProps {
  open?: boolean | false,
  onClose: Function,
  nft: NFT
}
type LayoutType = Parameters<typeof Form>[0]['layout'];



const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const ModalResignNFT = ({ open, onClose, nft }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose(false)
  };

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

    const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleChange =  (e: any) => {
    const formData = new FormData();
    formData.append('files', e.file.originFileObj);
    ResignNFT.upload(formData)
  }

  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const formItemLayout =
  formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;
  
  const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  return (
    <Modal className='modal-resign-nft' open={open} onOk={handleOk} onCancel={handleCancel}>
       <Form
        layout={formLayout}
        form={form}
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
      >
        <div className="modal-resign-nft__form pt-[40px]">
          <div className="grid grid-cols-12 gap-[20px] md:gap-[40px]">
            <div className="col-span-12 md:col-span-5">
              <div className="modal-resign-nft__background --background pt-[150%]"
                style={{
                  backgroundImage: `url(${nft?.image || ''})`
                }}
              />
            </div>

            <div className="modal-resign-nft__content col-span-12 md:col-span-7">
              <h3 className="modal-resign-nft__title">
                Resiter
              </h3>
              <p className="modal-resign-nft__desc">
                Explore our newly released NFT collection
              </p>
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-6">
                  <Form.Item label="First Name">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <div className="item-form__label block w-full">
                    <label htmlFor="avatar" className="--label">
                      Avatar
                    </label>
                     <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                  </div>
                  <Form.Item label="Last Name">
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalResignNFT;