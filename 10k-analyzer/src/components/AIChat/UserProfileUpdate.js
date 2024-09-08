import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/UserProfileUpdate.module.css';

const UserProfileUpdate = ({ currentProfile, onUpdate }) => {
  const [profile, setProfile] = useState(currentProfile);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(profile);
  };

  return (
    <motion.form
      className={styles.profileForm}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Update Your Investment Profile</h3>
      <div className={styles.formGroup}>
        <label htmlFor="riskTolerance">Risk Tolerance</label>
        <select
          id="riskTolerance"
          name="riskTolerance"
          value={profile.riskTolerance}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="investmentGoal">Primary Investment Goal</label>
        <select
          id="investmentGoal"
          name="investmentGoal"
          value={profile.investmentGoal}
          onChange={handleChange}
        >
          <option value="growth">Growth</option>
          <option value="income">Income</option>
          <option value="balanced">Balanced</option>
        </select>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Update Profile
      </motion.button>
    </motion.form>
  );
};

export default UserProfileUpdate;