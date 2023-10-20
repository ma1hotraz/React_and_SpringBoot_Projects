import React, { useState } from "react";
import i18n from '../i18n/i18n';

const LanguageSelector = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const chooseLanguage = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value);
        setSelectedLanguage(e.target.value);
    }

    return (
        <select defaultValue={selectedLanguage} onChange={chooseLanguage}>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
        </select>
    );
};

export default LanguageSelector;