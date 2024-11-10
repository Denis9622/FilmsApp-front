import { useState } from 'react';
import styles from './Filters.module.css';

function Filters({ onApplyFilters }) {
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState({
    ac: false,
    automatic: false,
    kitchen: false,
    tv: false,
    bathroom: false,
  });
  const [vehicleType, setVehicleType] = useState({
    van: false,
    integrated: false,
    alcove: false,
  });

  // Обработчик для изменения состояния Vehicle Equipment
  const handleFeatureChange = e => {
    const { name, checked } = e.target;
    setFeatures(prev => ({ ...prev, [name]: checked }));
  };

  // Обработчик для изменения состояния Vehicle Type
  const handleVehicleTypeChange = e => {
    const { name, checked } = e.target;
    setVehicleType(prev => ({ ...prev, [name]: checked }));
  };

  // Функция для применения фильтров
  const applyFilters = () => {
    const activeFilters = {
      location,
      features: Object.keys(features).filter(key => features[key]),
      vehicleType: Object.keys(vehicleType).filter(key => vehicleType[key]),
    };
    onApplyFilters(activeFilters); // Передаем только активные фильтры
  };

  const featureIcons = {
    ac: <img src="/images/AC.svg" alt="AC" className={styles.slotIcon} />,
    automatic: (
      <img
        src="/images/Automatic.svg"
        alt="Automatic"
        className={styles.slotIcon}
      />
    ),
    kitchen: (
      <img
        src="/images/Kitchen.svg"
        alt="Kitchen"
        className={styles.slotIcon}
      />
    ),
    tv: <img src="/images/TV.svg" alt="TV" className={styles.slotIcon} />,
    bathroom: (
      <img
        src="/images/Bathroom.svg"
        alt="Bathroom"
        className={styles.slotIcon}
      />
    ),
  };

  const vehicleTypeIcons = {
    van: <img src="/images/Van.svg" alt="Van" className={styles.slotIcon} />,
    integrated: (
      <img
        src="/images/integrated.svg"
        alt="Fully Integrated"
        className={styles.slotIcon}
      />
    ),
    alcove: (
      <img src="/images/Alcove.svg" alt="Alcove" className={styles.slotIcon} />
    ),
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterSection}>
        <label className={styles.subtitleone}>Location</label>
        <div className={styles.inputContainer}>
          <img src="/images/Map.svg" alt="Map icon" className={styles.icon} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Kyiv, Ukraine"
            className={styles.input}
          />
        </div>
      </div>

      <div className={`${styles.filterSection} ${styles.equipmentSection}`}>
        <h2 className={styles.subtitleh2}>Filters</h2>
        <label className={styles.subtitle}>Vehicle Equipment</label>
        <div className={styles.slotContainer}>
          {Object.keys(features).map(feature => (
            <label
              key={feature}
              className={`${styles.slot} ${
                features[feature] ? styles.activeSlot : ''
              }`}
            >
              <input
                type="checkbox"
                name={feature}
                checked={features[feature]}
                onChange={handleFeatureChange}
                className={styles.checkbox}
              />
              {featureIcons[feature]}
              <span className={styles.slotLabel}>
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <label className={styles.subtitle}>Vehicle Type</label>
        <div className={styles.slotContainer}>
          {Object.keys(vehicleType).map(type => (
            <label
              key={type}
              className={`${styles.slot} ${
                vehicleType[type] ? styles.activeSlot : ''
              }`}
            >
              <input
                type="checkbox"
                name={type}
                checked={vehicleType[type]}
                onChange={handleVehicleTypeChange}
                className={styles.checkbox}
              />
              {vehicleTypeIcons[type]}
              <span className={styles.slotLabel}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={applyFilters} className={styles.applyButton}>
        Search
      </button>
    </div>
  );
}

export default Filters;
