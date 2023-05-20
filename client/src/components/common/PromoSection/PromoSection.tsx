import Image from "next/image";
import React from "react";
import ButtonPromo from "./ButtonPromo/ButtonPromo";
import ButtonPromoContainer from "./ButtonPromoContainer/ButtonPromoContainer";
import { FormattedMessage } from "react-intl";

export default function PromoSection() {
    return (
        <ButtonPromoContainer>
            <ButtonPromo priority>
                <Image
                    src="/lightning.svg"
                    width={24}
                    height={32}
                    alt="молния"
                />
                <FormattedMessage id="30DaysSubscription" />
            </ButtonPromo>

            <ButtonPromo>
                <Image
                    src="/gift.svg"
                    width={56}
                    height={32}
                    alt="Активировать сертификат"
                />
                <FormattedMessage id="ActivateTheCertificate" />
            </ButtonPromo>
        </ButtonPromoContainer>
    );
}
