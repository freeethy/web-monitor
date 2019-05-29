import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, message, Icon } from "antd";

import antdEx from "icsoc-antd-ex";
import PwdContent from "./PwdContent";
import { getCookie } from "@/utils";
import addWaterMark from "@/utils/watermark";

import * as actions from "@/actions/resetPwd";

import "./index.less";

const {
  layout: { BaseContentMain, BaseContentMainHeader }
} = antdEx;
const FormItem = Form.Item;

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
@Form.create()
export default class ResetPwd extends Component {
  constructor(props) {
    super(props);

    this.key = 1;
    // a051960a777a18789c8310b1368d3beb251b11ae
    this.cookie = getCookie("ekt_access_token") || "";
    this.state = {
      confirmDirty: false,
      subLoading: false
    };

    this.waterMarkText = getCookie("watermark");
  }

  componentDidMount() {
    if (this.waterMarkText) {
      addWaterMark(this.waterMarkText, "#fff");
    }
  }

  submit = e => {
    const {
      actions,
      form: { validateFields, resetFields }
    } = this.props;
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        this.setState({ subLoading: true });

        actions
          .setLoginPwd(
            {
              old: values.old,
              new: values.password
            },
            {
              headers: { Authorization: `Bearer ${this.cookie}` }
            }
          )
          .then(res => {
            const { code, message: msg } = res.payload;
            if (code === 0) {
              message.success("密码重置成功，请登录！");
              this.key++;
              resetFields();
            } else {
              message.error(msg);
            }
            this.setState({ subLoading: false });
          })
          .catch(err => {
            message.error("重置密码失败！");
            this.setState({ subLoading: false });
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { subLoading } = this.state;

    const footer = (
      <Button type="primary" onClick={this.submit} loading={subLoading}>
        保存
      </Button>
    );

    return (
      <BaseContentMain>
        <BaseContentMainHeader title="重置密码" />
        <PwdContent
          key={this.key}
          type={1}
          form={form}
          className="reset-login"
        />
        <Row style={{ width: "400px" }}>
          <Col span={6} />
          <Col>{footer}</Col>
        </Row>
      </BaseContentMain>
    );
  }
}
