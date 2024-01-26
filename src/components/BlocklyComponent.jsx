// Updated BlocklyComponent.jsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blockly from 'blockly';
import { Logic } from './BlockCategories/Logic';
import { Loops } from './BlockCategories/Loops';
import { Math } from './BlockCategories/Math';
import { Text } from './BlockCategories/Text';
import initializeBlockly from './InitializeBlockly';  // import the function

import * as en from 'blockly/msg/en'; // Import English messages
import * as fr from 'blockly/msg/fr'; // Import French messages
// import countryFlagEmoji from "country-flag-emoji";

const BlocklyComponent = () => {

  const language = useSelector(state => state.language);
  // const ukEmoji = countryFlagEmoji.get('GB');
  // const franceEmoji = countryFlagEmoji.get('FR');

  const blocklyRef = useRef(null);

  const toggleLanguage = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    updateBlocklyLocale(selectedLanguage);
  };

  const updateBlocklyLocale = (lang) => {
    const languageMap = {
      en,
      fr,
    };
    Blockly.setLocale(languageMap[lang]);
  };

  useEffect(() => {

    updateBlocklyLocale(language); // Update Blockly locale based on the initial language


    if (blocklyRef.current === null) {
      // Initialize Blockly with English
        Blockly.setLocale('en');
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          
        </xml>
      `;
      initializeBlockly(toolboxXml);  // Initialize Blockly using the separate function
      blocklyRef.current = true;
    }
  }, [language]);

  return (
    <div style={{ width: '100%', height: '480px' }}>
      <h1 style={{ display: 'inline-block', fontSize: '14px', marginRight: '500px' }}>
        {language === 'en' ? 'Blockly Toolbox' : ' Boîte à outils Blockly'}
      </h1>
      <h1 style={{ display: 'inline-block', fontSize: '14px' }}>
        {language === 'en' ? 'Blockly Workspace' : 'Espace de travail Blockly'}
      </h1>
      <div className="highlighted" id="blocklyDiv" style={{ height: '100%', width: '100%', position: 'relative' }}></div>      
    </div>
  );
};

export default BlocklyComponent;