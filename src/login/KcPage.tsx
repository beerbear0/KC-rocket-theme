import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;
import './main.css'

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    setTimeout (() => {
        const button = document.getElementById('kc-login') as HTMLInputElement
        const spanLogin = document.querySelector('span[data-kc-msg="usernameOrEmail"]') as HTMLDivElement;
        const spanPassword = document.querySelector('span[data-kc-msg="password"]');
        const form = document.getElementById('kc-form-login');
        const loaderBox = document.getElementById('loader-box') as HTMLElement;

        if (button) {
            button.value = 'Войти'
        }

        if (spanLogin) {
            spanLogin.textContent = "Логин";
        }
        if (spanPassword) {
            spanPassword.textContent = "Пароль";
        }

        
        const handleSubmit = () => {
            loaderBox.style.display = 'flex';

            window.addEventListener('pageshow', () => {
                loaderBox.style.display = 'none';
            });

            setTimeout(() => {
                loaderBox.style.display = 'none';
            }, 5000);
        }

        form?.addEventListener('submit', handleSubmit)
    }, 200)

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <>
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />

                                <div id="loader-box" className="loaderBox">
                                    <div className="popup">
                                        <p className="loaderText">Подтвердите вход в приложении Indeed</p>
                                        <div className="loader" />
                                        <p className="loaderText">
                                            Если у вас нет на телефоне приложения Indeed Key, вы можете установить его
                                            по инструкции
                                            <a className="link" href="mkb.ru/udald">mkb.ru/udald</a>
                                        </p>

                                    </div>
                                </div>
                            </>
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcFormCardClass: "",
    kcLocaleDropDownClass: "",
    kcInfoAreaWrapperClass: "",
    kcFormGroupClass: "",
    kcFormSettingClass: '',
    kcLocaleWrapperClass: '',
    kcHeaderWrapperClass: '',
    kcButtonClass: '',
    kcButtonPrimaryClass: '',
    kcButtonBlockClass: '',
    kcButtonLargeClass: '',
    kcInputClass: '',
    kcFormPasswordVisibilityButtonClass: '',
} satisfies { [key in ClassKey]?: string };
