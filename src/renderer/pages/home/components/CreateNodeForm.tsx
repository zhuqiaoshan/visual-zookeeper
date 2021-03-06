import { Form, Input, Modal } from "antd";
import React from "react";
import { ModalProps } from "antd/es/modal";
import TextArea from "antd/lib/input/TextArea";
import { FormProps } from "antd/lib/form/Form";

export interface CreateData {
  zkNodeName: string;
  nodeData: string;
}

export interface CreateNodeFormProps {
  visible: boolean;
  parentNode: string;
  onCancel: ModalProps["onCancel"];
  onCreate: (values: CreateData) => void;
}

const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const CreateNodeForm: React.ComponentType<CreateNodeFormProps> = props => {
  const { visible, parentNode, onCancel, onCreate } = props;
  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then(values => {
      onCreate(values as CreateData);
    });
  };

  return (
    <Modal
      destroyOnClose
      title={"添加节点"}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确定"}
      cancelText={"取消"}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item label="父节点">
          <span>{parentNode}</span>
        </Form.Item>
        <Form.Item
          name={"zkNodeName"}
          label="节点名"
          rules={[{ required: true, message: "请输入节点名称" }]}
        >
          <Input placeholder={"请输入节点名称"} />
        </Form.Item>
        <Form.Item name={"nodeData"} label="节点值">
          <TextArea
            placeholder={"请输入节点值"}
            autoSize={{ minRows: 4, maxRows: 4 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateNodeForm;
