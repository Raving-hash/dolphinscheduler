/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineComponent, toRefs, withKeys } from 'vue'
import styles from './index.module.scss'
import { NInput, NButton, NSwitch, NForm, NFormItem } from 'naive-ui'
import { useValidate } from './use-validate'
import { useTranslate } from './use-translate'
import { useLogin } from './use-login'

const login = defineComponent({
  name: 'login',
  setup() {
    const { state, t, locale } = useValidate()

    const { handleChange } = useTranslate(locale)

    const { handleLogin } = useLogin(state)

    return { t, handleChange, handleLogin, ...toRefs(state) }
  },
  render() {
    return (
      <div class={styles.container}>
        <div class={styles['language-switch']}>
          <NSwitch
            onUpdateValue={this.handleChange}
            checked-value='en_US'
            unchecked-value='zh_CN'
          >
            {{
              checked: () => 'en_US',
              unchecked: () => 'zh_CN',
            }}
          </NSwitch>
        </div>
        <div class={styles['login-model']}>
          <div class={styles.logo}>
            <div class={styles['logo-img']}></div>
          </div>
          <div class={styles['form-model']}>
            <NForm rules={this.rules} ref='loginFormRef'>
              <NFormItem
                label={this.t('login.userName')}
                label-style={{ color: 'black' }}
                path='userName'
              >
                <NInput
                  type='text'
                  size='large'
                  v-model={[this.loginForm.userName, 'value']}
                  placeholder={this.t('login.userName_tips')}
                  autofocus
                  onKeydown={withKeys(this.handleLogin, ['enter'])}
                />
              </NFormItem>
              <NFormItem
                label={this.t('login.userPassword')}
                label-style={{ color: 'black' }}
                path='userPassword'
              >
                <NInput
                  type='password'
                  size='large'
                  v-model={[this.loginForm.userPassword, 'value']}
                  placeholder={this.t('login.userPassword_tips')}
                  onKeydown={withKeys(this.handleLogin, ['enter'])}
                />
              </NFormItem>
            </NForm>
            <NButton round type='primary' onClick={this.handleLogin}>
              {this.t('login.signin')}
            </NButton>
          </div>
        </div>
      </div>
    )
  },
})

export default login