import { FormattedMessage } from "react-intl";
import MyInput from "../../../../components/common/Input/MyInput";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { createReview } from "../../api/createReview";
import React, { useState, useRef, FC } from "react";
import { useRouter } from "next/router";
import useAuth from "../../../../components/auth/hooks/useAuth";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";

const Form: FC<{ callback: () => void; id?: number }> = ({ callback, id }) => {
    const refText = useRef<HTMLInputElement | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();
    const lang = useSelector(getLang());
    const auth = useAuth()?.auth;

    const create = async (id?: number) => {
        if (!localStorage.getItem("FAKEIVI_ACCESS_TOKEN")) {
            await router.push("/auth/login");
            return null;
        }
        if (Number(refText?.current?.value?.length) > 3) {
            createReview(
                refText?.current?.value || "",
                auth?.userEmail || "",
                Number(router?.query?.id) || 4476421,
                id || null
            )
                .then(() => {
                    setVisible(false);
                    callback();
                })
                .catch(() => setVisible(true));
        } else {
            setVisible(true);
        }
    };

    return (
        <>
            <MyInput
                testId="inpReviewTest"
                ref={refText}
                placeholder={lang === "Ru" ? "Комментарий" : "Comment"}
                styler={{ boxShadow: visible ? "0 0 5px 7px red" : "" }}
            />
            <MyButton
                testid="buttonReviewAdd"
                onClick={() => create(id)}
                type="pink"
                size="medium"
            >
                <FormattedMessage id="Send" />
            </MyButton>
        </>
    );
};

export default Form;
