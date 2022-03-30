import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import { FC, useState } from 'react';
import FormLogin, { FormMode } from './Form';

const TabsLogin: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <Tabs variant="enclosed" index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab>SignIn</Tab>
        <Tab>SignUp</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{tabIndex === 0 && <FormLogin mode={FormMode.signIn} />}</TabPanel>
        <TabPanel>{tabIndex === 1 && <FormLogin mode={FormMode.signUp} />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsLogin;
