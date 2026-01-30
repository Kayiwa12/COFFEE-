// Educational content for users
export interface EducationTip {
  id: string;
  title: string;
  content: string;
  category: 'spotting' | 'safety' | 'resistance' | 'storage';
  translations: {
    en: { title: string; content: string };
    lg: { title: string; content: string }; // Luganda
    ach: { title: string; content: string }; // Acholi
  };
}

export const educationTips: EducationTip[] = [
  {
    id: '1',
    title: 'Check the Packaging',
    content: 'Authentic medicines have clear, professional packaging with no spelling errors, clear expiry dates, and proper seals.',
    category: 'spotting',
    translations: {
      en: {
        title: 'Check the Packaging',
        content: 'Authentic medicines have clear, professional packaging with no spelling errors, clear expiry dates, and proper seals.'
      },
      lg: {
        title: 'Kebera Ekifuniko',
        content: 'Eddagala ettukuvu lirina ekifuniko ekitegeerekeka, ekitalina nsobi mu nnyukuta, n\'ekifo ekitegeerekeka eky\'okuggwaawo.'
      },
      ach: {
        title: 'Nen Pakej',
        content: 'Yat ma atir tye ki pakej ma ber, ma pe tye ki bal i nyig, ki nino pa kare ma pire tek, ki seal ma ber.'
      }
    }
  },
  {
    id: '2',
    title: 'Verify Batch Numbers',
    content: 'Every medicine should have a batch number. Use MedCheck to verify it matches the manufacturer\'s records.',
    category: 'spotting',
    translations: {
      en: {
        title: 'Verify Batch Numbers',
        content: 'Every medicine should have a batch number. Use MedCheck to verify it matches the manufacturer\'s records.'
      },
      lg: {
        title: 'Kakasa Namba y\'Omuganda',
        content: 'Buli ddagala lirina namba y\'omuganda. Kozesa MedCheck okukakasa nti egatta n\'ebiwandiiko by\'omukolera.'
      },
      ach: {
        title: 'Mok Namba me Batch',
        content: 'Yat weng myero obed ki namba me batch. Tii ki MedCheck me moko ni oromo ki gin ma gicoyo pa lukweny.'
      }
    }
  },
  {
    id: '3',
    title: 'Buy from Trusted Pharmacies',
    content: 'Only purchase medicines from licensed pharmacies. Use our Pharmacy Check feature to verify their credentials.',
    category: 'safety',
    translations: {
      en: {
        title: 'Buy from Trusted Pharmacies',
        content: 'Only purchase medicines from licensed pharmacies. Use our Pharmacy Check feature to verify their credentials.'
      },
      lg: {
        title: 'Gula mu Dduka ly\'Eddagala Eryeesigika',
        content: 'Gulanga eddagala mu maduka g\'eddagala agalina layisensi. Kozesa ekikugu kyaffe eky\'okukebera amaduka g\'eddagala okukakasa ebibakwata.'
      },
      ach: {
        title: 'Wil Ki Bot Yat Ma Igen',
        content: 'Wil yat ki i gang yat ma tye ki layikin keken. Tii ki jami me Pharmacy Check me moko layikin gi.'
      }
    }
  },
  {
    id: '4',
    title: 'Complete Your Antibiotics',
    content: 'Always complete the full course of antibiotics even if you feel better. Stopping early contributes to antimicrobial resistance.',
    category: 'resistance',
    translations: {
      en: {
        title: 'Complete Your Antibiotics',
        content: 'Always complete the full course of antibiotics even if you feel better. Stopping early contributes to antimicrobial resistance.'
      },
      lg: {
        title: 'Maliriza Eddagala Lyonna',
        content: 'Bulijjo maliriza eddagala lyonna ery\'okutta obuwuka ne bw\'owulira nga wawona. Okuyimiriza mangu kiyamba mu kukola obuwuka obutawangulika ddagala.'
      },
      ach: {
        title: 'Tyek Yat me Bacteria',
        content: 'Tyek yat me bacteria weng kata bed ni inyorre ni iparo ber. Juko cok con yato me tedo bacteria ma pe mwoyo ki yat.'
      }
    }
  },
  {
    id: '5',
    title: 'Store Medicines Properly',
    content: 'Keep medicines in a cool, dry place away from direct sunlight. Check storage instructions on the label.',
    category: 'storage',
    translations: {
      en: {
        title: 'Store Medicines Properly',
        content: 'Keep medicines in a cool, dry place away from direct sunlight. Check storage instructions on the label.'
      },
      lg: {
        title: 'Tereka Eddagala Bulungi',
        content: 'Kuuma eddagala mu kifo ekinyeegeevu era ekikalu nga tekiraba musana butereevu. Kebera ebiragiro by\'okutereka ku kalabba.'
      },
      ach: {
        title: 'Kan Yat Maber',
        content: 'Kan yat i kabedo ma two kuc, ma yot woko ki ceng ma tye tir. Nen cik me kano yat i kom label.'
      }
    }
  },
  {
    id: '6',
    title: 'Watch for Side Effects',
    content: 'Be aware of common side effects and seek medical help if you experience severe reactions like difficulty breathing or swelling.',
    category: 'safety',
    translations: {
      en: {
        title: 'Watch for Side Effects',
        content: 'Be aware of common side effects and seek medical help if you experience severe reactions like difficulty breathing or swelling.'
      },
      lg: {
        title: 'Tuntulira Ebiva ku Ddagala',
        content: 'Manya ebiva ku ddagala ebya bulijjo era noonya obujjanjabi bw\'olaba ebiva ku ddagala ebikambwe ng\'okukaluubirwa okukka omukka oba okuzimba.'
      },
      ach: {
        title: 'Nen Gin Ma Yat Kelo',
        content: 'Bed ki ngec kom gin ma yat twero kelo ki dwog kony pa lutino ka ineno gin marac macalo peko me yubo mukuluk onyo pii.'
      }
    }
  },
  {
    id: '7',
    title: 'Never Share Medicines',
    content: 'Medicines are prescribed for specific conditions. Never share your medicines with others, even if they have similar symptoms.',
    category: 'safety',
    translations: {
      en: {
        title: 'Never Share Medicines',
        content: 'Medicines are prescribed for specific conditions. Never share your medicines with others, even if they have similar symptoms.'
      },
      lg: {
        title: 'Togabana Ddagala',
        content: 'Eddagala liweerwa olw\'endwadde ezitongole. Togabana ddagala lyo na balala wadde ng\'balina obubonero obw\'enjawulo.'
      },
      ach: {
        title: 'Kik I Poki Yat',
        content: 'Yat miyo pi tuo matwal keken. Kik i poki yat mamegi ki dano mukene, kata bed ni gutye ki jami macalo.'
      }
    }
  },
  {
    id: '8',
    title: 'Check Expiry Dates',
    content: 'Never use expired medicines. They may be ineffective or even harmful. MedCheck helps you track expiry dates.',
    category: 'spotting',
    translations: {
      en: {
        title: 'Check Expiry Dates',
        content: 'Never use expired medicines. They may be ineffective or even harmful. MedCheck helps you track expiry dates.'
      },
      lg: {
        title: 'Kebera Olunaku Ddagala Lw\'Eggwaawo',
        content: 'Tokozesa ddagala erimaze okuggwaawo. Liyinza obutakola oba n\'okukosa. MedCheck ekuyamba okugoberera ennaku ddagala ze ziggwaamu.'
      },
      ach: {
        title: 'Nen Nino Pa Kare',
        content: 'Kik i tii ki yat ma kare ne okato. Romo bedo ni pe tiyo onyo yobo. MedCheck konyi me lubo nino pa kare.'
      }
    }
  }
];

export const getEducationByLanguage = (language: 'en' | 'lg' | 'ach') => {
  return educationTips.map(tip => ({
    id: tip.id,
    title: tip.translations[language].title,
    content: tip.translations[language].content,
    category: tip.category
  }));
};
