import styles from '../styles/variables/variables.module.scss';

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: styles.mainBgColor,
    borderColor: styles.mainBgColor,
    color: styles.mainFontColor,
    cursor: 'pointer',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? styles.cardBgColor : styles.mainBgColor, // Selected option background
    color: styles.mainFontColor,
    cursor: 'pointer',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: styles.mainFontColor, // Selected value text color
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#d5d3aa', // Dropdown menu background
    borderColor: styles.mainFontColor,
    cursor: 'pointer',
  }),
  input: (provided: any) => ({
    ...provided,
    color: styles.mainFontColor,
    cursor: 'pointer',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: styles.mainFontColor,
  }),
};
