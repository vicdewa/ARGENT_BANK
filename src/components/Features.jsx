import React from 'react';
import FeatureItem from './FeatureItem';
import '../../css/main.css';


const FeatureSection = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <div className="feature-container">
        <FeatureItem
          icon="/img/icon-chat.png"
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our
          24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem
          icon="/img/icon-money.png"
          title="More savings means higher rates"
          description="More savings means higher rates. The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem
          icon="/img/icon-security.png"
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is
          always safe."
        />
      </div>
    </section>
  );
};

export default FeatureSection;
