"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { IconBuildingStore, IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { useBranch } from "@context/BranchContext";
import styles from "./BranchPicker.module.css";

/**
 * Кнопка «Ваш магазин: …» в шапке + список магазинов (на телефоне — нижний
 * лист, на ПК — окно по центру). Нет филиалов (бэкенд их не отдаёт) — кнопки нет.
 */
export default function BranchPicker() {
  const t = useTranslations("branch");
  const { branches, activeBranch, defaultBranch, selectBranch } = useBranch();
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    const selected = listRef.current?.querySelector<HTMLButtonElement>("[aria-pressed='true']");
    (selected || listRef.current?.querySelector<HTMLButtonElement>("button"))?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (branches.length < 2) return null;

  const handleSelect = (branchId: string) => {
    selectBranch(branchId);
    close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        title={t("chooseStore")}
      >
        <IconBuildingStore size={18} stroke={1.6} aria-hidden />
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>{t("yourStore")}</span>
          <span className={styles.triggerName}>{activeBranch?.name || t("chooseStore")}</span>
        </span>
        <IconChevronDown size={14} stroke={1.8} aria-hidden className={styles.chevron} />
      </button>

      {open &&
        createPortal(
          <div className={styles.overlay} onClick={close} role="presentation">
            <div
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-labelledby="branch-picker-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.handle} aria-hidden />
              <div className={styles.header}>
                <div>
                  <h2 id="branch-picker-title" className={styles.title}>
                    {t("chooseStore")}
                  </h2>
                  <p className={styles.hint}>{t("pickerHint")}</p>
                </div>
                <button
                  type="button"
                  className={styles.close}
                  onClick={close}
                  aria-label={t("close")}
                >
                  <IconX size={20} />
                </button>
              </div>

              <ul ref={listRef} className={styles.list}>
                {branches.map((branch) => {
                  const selected = branch.id === activeBranch?.id;
                  return (
                    <li key={branch.id}>
                      <button
                        type="button"
                        className={selected ? `${styles.item} ${styles.itemSelected}` : styles.item}
                        aria-pressed={selected}
                        onClick={() => handleSelect(branch.id)}
                      >
                        <span className={styles.itemBody}>
                          <span className={styles.itemName}>
                            {branch.name}
                            {branch.id === defaultBranch?.id ? (
                              <span className={styles.badge}>{t("main")}</span>
                            ) : null}
                          </span>
                          {branch.address ? (
                            <span className={styles.itemMeta}>{branch.address}</span>
                          ) : null}
                          {branch.phone ? (
                            <span className={styles.itemMeta}>{branch.phone}</span>
                          ) : null}
                        </span>
                        {selected ? (
                          <IconCheck size={20} className={styles.check} aria-hidden />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
