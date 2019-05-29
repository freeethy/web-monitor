import React, { Component } from "react";
import { Form, Row, Col, Input, Icon } from "antd";
import PwdTip from "../PwdTip";

import "./index.less";

const FormItem = Form.Item;

const scoreRule = {
  len: value => {
    const len = value.trim().length;
    if (len >= 6 && len <= 10) {
      return 15;
    }
    if (len >= 10) {
      return 30;
    }
  },
  letter1: value => {
    if (/[a-z]+/.test(value) ^ /[A-Z]+/.test(value)) {
      return 10;
    }
    if (/[a-z]+/.test(value) && /[A-Z]+/.test(value)) {
      return 30;
    }
  },
  letter2: value => {
    if (value.match(/[a-zA-Z]+/g).join("").length < 3) {
      return 10;
    } else {
      return 20;
    }
  },
  number: value => {
    if (value.match(/[0-9]+/g).join("").length < 3) {
      return 10;
    } else {
      return 20;
    }
  }
};

const scoreLevel = {
  1: "弱",
  2: "中",
  3: "强"
};

export default class ResetContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      checkLength: undefined,
      checkType: undefined,
      level: 0
    };
  }

  getLevel = value => {
    let score = 0,
      level = 1;
    Object.keys(scoreRule).map(key => {
      score += scoreRule[key](value);
    });

    if (score > 60 && score < 80) {
      level = 2;
    } else if (score >= 80) {
      level = 3;
    }
    return level;
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("再次输入的密码不一致");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    let checkLength,
      checkType,
      level = 0;

    if (value) {
      value = value.trim();
      if (value.length < 6 || value.length > 32) {
        checkLength = false;
      } else {
        checkLength = true;
      }
      if (!/[0-9]+/.test(value) || !/[a-zA-Z]+/.test(value)) {
        checkType = false;
      } else {
        checkType = true;
      }
    }

    if (checkLength && checkType) {
      level = this.getLevel(value);
      callback();
    } else {
      // 验证不通过
      callback(" ");
    }
    this.setState({ checkLength, checkType, level });

    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const {
      type = 0,
      username = "",
      usernum = "",
      className,
      form: { getFieldDecorator }
    } = this.props;
    const { checkLength, checkType, level } = this.state;

    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 18 } }
    };
    return (
      <Form
        {...formItemLayout}
        className={className ? `reset-form ${className}` : "reset-form"}
      >
        {!type ? (
          <p className="reset-user">
            尊敬的：{username}，工号{usernum}，请重置您的密码！
          </p>
        ) : (
          <FormItem label="原始密码：">
            {getFieldDecorator("old", {
              rules: [
                {
                  required: true,
                  message: "原始密码不正确"
                }
              ]
            })(<Input.Password placeholder="请输入原始密码" />)}
          </FormItem>
        )}
        <FormItem label="新密码：">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: " "
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password placeholder="请填写密码" />)}
          <PwdTip checkLength={checkLength} checkType={checkType} />
          <span className={`reset-pwd-level reset-pwd-level-${level}`}>
            {scoreLevel[level]}
          </span>
        </FormItem>
        <FormItem label="确认新密码：">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: " "
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              placeholder="请再次填写密码"
              onBlur={this.handleConfirmBlur}
            />
          )}
        </FormItem>
      </Form>
    );
  }
}
