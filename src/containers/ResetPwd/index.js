import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, message, Spin } from "antd";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import PwdContent from "./PwdContent";
import LinkInvalid from "./LinkInvalid";

import * as commonActions from "@/actions/common";
import * as actions from "@/actions/resetPwd";

import "./index.less";

const FormItem = Form.Item;

@connect(
  state => ({}),
  dispatch => ({
    commonActions: bindActionCreators(commonActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  })
)
@Form.create()
export default class ResetPwd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      subLoading: false,
      validLink: true,
      confirmDirty: false
    };

    this.key = 1;
    this.token = props.location.query.token;

    props.actions.checkToken({ token: this.token }).then(
      res => {
        const {
          code,
          message: msg,
          data: { user_name: username, user_num: usernum }
        } = res.payload;
        this.setState({ loading: false, validLink: !!code, username, usernum });
      },
      err => {
        this.setState({
          validLink: false,
          loading: false
        });
      }
    );
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
          .setPwd({
            token: this.token,
            new: values.password,
            confirm: values.confirm
          })
          .then(res => {
            const { code, message: msg } = res.payload;
            if (code === 0) {
              message.success("密码重置成功，请登录！", 2.5).then(() => {
                window.location.href = process.env.REACT_APP_LOGIN_DOMAIN;
              });
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

  rtLogin = () => {
    window.location.href = process.env.REACT_APP_LOGIN_DOMAIN;
  };

  render() {
    const { form, actions, commonActions } = this.props;
    const { getFieldDecorator } = form;
    const { validLink, loading, subLoading, username, usernum } = this.state;

    const footer = validLink ? (
      <Button type="primary" onClick={this.submit} loading={subLoading}>
        确定
      </Button>
    ) : (
      <Button type="primary" onClick={this.rtLogin}>
        返回至登录
      </Button>
    );

    return (
      <React.Fragment>
        <Header />

        <MainContent
          header="重置密码"
          footer={footer}
          className="reset-container"
        >
          <React.Fragment>
            <Button
              onClick={() => {
                commonActions.point({ test: 1 });
              }}
            >
              test
            </Button>
            <Button
              onClick={() => {
                commonActions.behaviorInfo({
                  behaviorType: 1,
                  happenTime: new Date().getTime()
                });
              }}
            >
              post behaviorInfo
            </Button>
          </React.Fragment>
        </MainContent>
        <Footer />
      </React.Fragment>
    );
  }
}
