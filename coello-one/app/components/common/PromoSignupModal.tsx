"use client";

import { useEffect } from "react";
import { Modal } from "antd";
import DiscountWaitlistForm from "@/components/pages/DiscountWaitlistForm";
import { useTranslations } from "@/localization/useTranslations";
import type { DiscountsCopy } from "@/types/pages";
import { trackEvent } from "@/utils/trackEvent";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

type PromoSignupModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;
  copy?: DiscountsCopy["form"];
};

const PromoSignupModal = ({ open, onClose, source, copy }: PromoSignupModalProps) => {
  const locale = useCurrentLocale();
  const pagesCopy = useTranslations("pages");
  const formCopy = copy ?? pagesCopy.discounts.form;

  useEffect(() => {
    if (open) {
      trackEvent(
        "promo_signup_modal_open",
        { source },
        { locale, translationKey: "pages.discounts.form.submitLabel" },
      );
    }
  }, [locale, open, source]);

  const handleClose = () => {
    trackEvent("promo_signup_modal_close", { source });
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      maskClosable={false}
      destroyOnHidden
      width={520}
      title={formCopy.title}
    >
      <DiscountWaitlistForm copy={formCopy} hideTitle />
    </Modal>
  );
};

export default PromoSignupModal;
