import { Scene } from "phaser";

export class Login extends Scene {
  constructor() {
    super("Login");
  }
  create() {
    let { width, height } = this.cameras.main;
    this.add
      .rectangle(0, 0, width, height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0.5);
    const loginPanelBg = this.add
      .image(width / 2, height / 2 - 50, "loginPanel", "bg")
      .setDisplaySize(width * 0.72, height * 0.25);
      
    const loginPanel = this.add.container(width / 2, height / 2 - 50);
    const registerPanel = this.add.container(width / 2, height / 2 - 50);
    
    const usernameLabel = this.add.text(-100, -40, "账 号", {
      fontFamily: "Arial",
      fontSize: "16px",
      color: "#ffffff",
    }).setOrigin(0,0.5)
    const usernameInputBg = this.add
      .sprite(
        usernameLabel.x + usernameLabel.displayWidth + 10,
        -40,
        "loginPanel",
        "input"
      )
      .setDisplaySize(150, 30)
      .setOrigin(0, 0.5);
    const usernameElement = document.createElement("input");
    usernameElement.setAttribute("id", "username");
    usernameElement.placeholder = "输入账号名/手机号";
    const usernameInput = this.add
      .dom(usernameInputBg.x + 5, usernameInputBg.y, usernameElement, {
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        width: usernameInputBg.displayWidth - 15 + "px",
      })
      .setOrigin(0, 0.5)
      .setInteractive();
    const passwordLabel = this.add
      .text(-100, usernameLabel.y + usernameLabel.displayHeight + 15, "密 码", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0, 0.5);
    const passwordInputBg = this.add
      .image(
        passwordLabel.x + passwordLabel.displayWidth + 10,
        passwordLabel.y,
        "loginPanel",
        "input"
      )
      .setDisplaySize(150, 30)
      .setOrigin(0, 0.5);
      const passwordElement = document.createElement("input");
      passwordElement.setAttribute("id", "password");
      passwordElement.type = "password";
      passwordElement.placeholder = "输入密码";
      const passwordInput = this.add
        .dom(passwordInputBg.x + 5, passwordInputBg.y, passwordElement, {
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: passwordInputBg.displayWidth - 15 + "px",
        })
        .setOrigin(0, 0.5);
    const loginBtn = this.add
      .image(0, 50, "loginPanel", "btn")
      .setScale(0.3)
      .setOrigin(0.5)
      .setInteractive()
        .on("pointerdown", () => {
          const username = (
            document.getElementById("username") as HTMLInputElement
          ).value;
          const password = (
            document.getElementById("password") as HTMLInputElement
          ).value;
          // if (username === "user" && password === "123") {
          //     // this.sound.play("bgm");
          //     this.game.scene.start("Home");
          //     //将输入框销毁
          //     usernameInput.destroy()
          //     passwordInput.destroy()
          // }
            this.game.scene.start("Home");
            //将输入框销毁
            usernameInput.destroy()
            passwordInput.destroy()
        });
    const loginText = this.add
      .text(loginBtn.x, loginBtn.y -10, "登录", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    const switchToRegister = this.add
      .text(loginBtn.x, loginBtn.y  + 20, "暂未注册，点击注册", {
        fontSize: "10px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
          loginPanel.setVisible(false);
          registerPanel.setVisible(true);
      });
    loginPanel.add([
      usernameLabel,
      usernameInputBg,
      usernameInput,
      passwordLabel,
      passwordInputBg,
      passwordInput,
      loginBtn,
      loginText,
      switchToRegister,
    ]);
    loginPanel.setVisible(true);
    
    const registerTelLabel = this.add
      .text(-110, -40, "手机号", {fontFamily: "Arial",fontSize: "16px",color: "#ffffff",})
      .setOrigin(0, 0.5);
    const registerTelInputBg = this.add
      .sprite(
        registerTelLabel.x + registerTelLabel.displayWidth + 10,-40,
        "loginPanel","input"
      )
      .setDisplaySize(150, 30)
      .setOrigin(0, 0.5);
    const registerTelElement = document.createElement("input");
    registerTelElement.setAttribute("id", "tel");
    registerTelElement.placeholder = "输入手机号";
    const registerTelInput = this.add
      .dom(
        registerTelInputBg.x + 5,
        registerTelInputBg.y,
        registerTelElement,
        {
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: registerTelInputBg.displayWidth - 15 + "px",
        }
      )
      .setOrigin(0, 0.5)
      .setInteractive();
    const registerCodeLabel = this.add
      .text(
        -110,
        registerTelLabel.y + registerTelLabel.displayHeight + 15,
        "验证码",
        {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#ffffff",
        }
      )
      .setOrigin(0, 0.5);
    const registerCodeInputBg = this.add
      .image(
        registerCodeLabel.x + registerCodeLabel.displayWidth + 10,
        registerCodeLabel.y,
        "loginPanel",
        "input"
      )
      .setDisplaySize(80, 30)
      .setOrigin(0, 0.5);
    const registerCodeElement = document.createElement("input");
    registerCodeElement.setAttribute("id", "code");
    const registerCodeInput = this.add
      .dom(
        registerCodeInputBg.x + 5,
        registerCodeInputBg.y,
        registerCodeElement,
        {
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: registerCodeInputBg.displayWidth - 15 + "px",
        }
      )
      .setOrigin(0, 0.5);
    const sendCodeBtn = this.add
      .image(
        registerCodeInputBg.x + registerCodeInputBg.displayWidth + 15 ,
        registerCodeInputBg.y,
        "btnBlue"
      )
      .setOrigin(0, 0.5)
      .setScale(0.3 , 0.5);
      const sendCodeText = this.add
        .text(sendCodeBtn.x + 10, sendCodeBtn.y, "获取", {
          fontFamily: "Arial",
          fontSize: "14px",
          color: "#ffffff",
        })
        .setOrigin(0,0.5);
    const registerPasswordLabel = this.add
      .text(
        -100,
        registerCodeLabel.y + registerCodeLabel.displayHeight + 15,
        "密 码",
        {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "#ffffff",
        }
      )
      .setOrigin(0, 0.5);
    const registerPasswordInputBg = this.add
      .image(
        registerPasswordLabel.x + registerPasswordLabel.displayWidth + 10,
        registerPasswordLabel.y,
        "loginPanel",
        "input"
      )
      .setDisplaySize(150, 30)
      .setOrigin(0, 0.5);
    const registerPasswordElement = document.createElement("input");
    registerPasswordElement.setAttribute("id", "registerPwd");
    registerPasswordElement.placeholder = "输入密码";
    const registerPasswordInput = this.add
      .dom(
        registerPasswordInputBg.x + 5,
        registerPasswordInputBg.y,
        registerPasswordElement,
        {
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: registerPasswordInputBg.displayWidth - 15 + "px",
        }
      )
      .setOrigin(0, 0.5);
    const registerBtn = this.add
        .image(0, 60, "btnYellow")
        .setScale(0.5)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
            const tel = (document.getElementById("tel") as HTMLInputElement).value;
            const code = (document.getElementById("code") as HTMLInputElement).value;
            const password = (document.getElementById("registerPwd") as HTMLInputElement).value
            console.log(tel,code,password);
            
            // if (username === "user" && password === "123") {
            //     // this.sound.play("bgm");
            //     this.game.scene.start("Home");
            //     //将输入框销毁
            //     usernameInput.destroy()
            //     passwordInput.destroy()
            // }
        });
    const registerText = this.add
      .text(registerBtn.x, registerBtn.y, "注册", {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    registerPanel.add([
      registerTelLabel,
      registerTelInputBg,
      registerTelInput,
      registerCodeLabel,
      registerCodeInputBg,
      registerCodeInput,
      sendCodeBtn,
      sendCodeText,
      registerPasswordLabel,
      registerPasswordInputBg,
      registerPasswordInput,
      registerBtn,
      registerText,
    ]);
    registerPanel.setVisible(false)
  }
}