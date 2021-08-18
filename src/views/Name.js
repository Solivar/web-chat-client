import React from 'react';

import * as styles from './Name.module.scss';

import { FaArrowRight } from 'react-icons/fa';

const Name = () => {
  return (
    <div className={`box ${styles.form}`}>
      <h1 className="title">Web Chat App</h1>
      <p className="block">You need to specify a name before you can start chatting.</p>
      <form>
        <div className="field">
          <label className="label" htmlFor="name">
            Name
          </label>
          <div className="control">
            <input id="name" className="input" placeholder="Enter your name" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary">
              <span className="is-uppercase has-text-weight-semibold">Submit</span>
              <span className="icon is-small  mt-1">
                <i className="fas fa-paper-plane">
                  <FaArrowRight />
                </i>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Name;
