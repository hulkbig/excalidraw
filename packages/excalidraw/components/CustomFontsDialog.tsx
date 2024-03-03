import { useEffect, useState } from "react";
import { Dialog } from "./Dialog";
import { TextField } from "./TextField";
import DialogActionButton from "./DialogActionButton";
import { KEYS } from "../keys";
import { InlineIcon } from "./InlineIcon";
import { FontFamilyNormalIcon, FontFamilyCodeIcon, FreedrawIcon } from './icons';
import { Paragraph } from "./Paragraph";
import { EDITOR_LS_KEYS } from '../constants';
import { EditorLocalStorage } from "../data/EditorLocalStorage";

import "./CustomFontsDialog.scss";

export type fontUrl = string | null;

export const CustomFontsDialog = (props: {
  onClose: () => void;
}) => {
  const [handwritingFont, setHandwritingFont] = useState<string>("https://excalidraw-zh.com/fonts/Xiaolai.woff2");
  const [normalFont, setNormalFont] = useState<string>("");
  const [codeFont, setCodeFont] = useState<string>("");

  useEffect(() => {
    if (!EditorLocalStorage.has(EDITOR_LS_KEYS.CUSTOM_FONTS)) {
      return;
    }
    const customFonts = EditorLocalStorage.get(EDITOR_LS_KEYS.CUSTOM_FONTS) as {
      handwritingFont: string | null;
      normalFont: string | null;
      codeFont: string | null;
    } | null;
    if (!customFonts) {
      return;
    }
    if (customFonts.handwritingFont) {
      setHandwritingFont(customFonts.handwritingFont);
    }
    if (customFonts.normalFont) {
      setNormalFont(customFonts.normalFont);
    }
    if (customFonts.codeFont) {
      setCodeFont(customFonts.codeFont);
    }
  }, [])

  const onConfirm = () => {
    if (handwritingFont || normalFont || codeFont) {
      EditorLocalStorage.set(EDITOR_LS_KEYS.CUSTOM_FONTS, {
        handwritingFont: handwritingFont,
        normalFont: normalFont,
        codeFont: codeFont,
      });
      window.location.reload();
      return;
    }
    props.onClose();
  }

  return (
    <Dialog
      onCloseRequest={() => {
        props.onClose();
      }}
      title={
        <div style={{ display: "flex" }}>
          Custom Fonts{" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.1rem 0.5rem",
              marginLeft: "1rem",
              fontSize: 14,
              borderRadius: "12px",
              color: "#000",
              background: "pink",
            }}
          >
            Experimental
          </div>
        </div>
      }
      className="CustomFonts"
      autofocus={false}
    >
      <Paragraph>
        Custom fonts are an experimental feature that allows you to use your own fonts in Excalidraw.
      </Paragraph>
      <Paragraph>
        You can add your own fonts by config the target font file url. Follow the the website to find more available fonts.
        {" "}
        <a
          href="https://platform.openai.com/login?launch"
          rel="noopener noreferrer"
          target="_blank"
        >
          Fonts
        </a>
      </Paragraph>
      <Paragraph>
        More features are coming soon.
      </Paragraph>
      <p />
      <TextField
        isRedacted={false}
        value={handwritingFont}
        placeholder="Paste your custom handwriting font url here, leave it empty to use default font."
        label="Handwriting Font"
        labelIcon={<InlineIcon icon={FreedrawIcon} />}
        onChange={(value) => {
          setHandwritingFont(value);
        }}
        selectOnRender
        onKeyDown={(event) => event.key === KEYS.ENTER && onConfirm()}
      />
      <p />
      <TextField
        isRedacted={false}
        value={normalFont}
        placeholder="Paste your custom normal font url here, leave it empty to use default font."
        label="Normal Font"
        labelIcon={<InlineIcon icon={FontFamilyNormalIcon} />}
        onChange={(value) => {
          setNormalFont(value);
        }}
        selectOnRender
        onKeyDown={(event) => event.key === KEYS.ENTER && onConfirm()}
      />
      <p />

      <TextField
        isRedacted={false}
        value={codeFont}
        placeholder="Paste your custom code font url here, leave it empty to use default font."
        label="Code Font"
        labelIcon={<InlineIcon icon={FontFamilyCodeIcon} />}
        onChange={(value) => {
          setCodeFont(value);
        }}
        selectOnRender
        onKeyDown={(event) => event.key === KEYS.ENTER && onConfirm()}
      />
      <p />
      <DialogActionButton
        label="Confirm"
        actionType="primary"
        isLoading={false}
        onClick={onConfirm}
      />

    </Dialog>
  );
};
