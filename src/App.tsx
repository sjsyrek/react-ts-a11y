import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  SyntheticEvent
} from "react";
import styles from "./App.module.css";
import "./index.css";

// TODO: need unique ids (use nanoid)
// TODO: implement delete (and insert) put small x in tab
// TODO: what happens if there are too many tabs?
// TODO: run cypress test
// TODO: make a more React-like API (for content) maybe make panel content a callback
// TODO: customize how active tab looks
// TODO: children.map to handle state but expose subcomponents for styling

interface Tab {
  selected: boolean;
  id: string;
  index: number;
  onClick: (index: number) => React.MouseEvent<number>;
  children: React.ReactNode;
}

const Tab = ({ children, selected = false, id, index, onClick }: Tab) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (selected && ref.current) {
      ref.current.focus();
    }
  }, [selected]);

  return (
    <button
      role="tab"
      type="button"
      aria-selected={selected}
      aria-controls={`${id}-tab`}
      id={id}
      tabIndex={selected ? undefined : -1}
      onClick={() => onClick(index)}
      ref={ref}
    >
      {children}
    </button>
  );
};

const TabList = ({ children, label, onKeyDown }) => (
  <div role="tablist" aria-label={label} onKeyDown={onKeyDown}>
    {children}
  </div>
);

const TabPanel = ({ children, id, selected = false }) => (
  <div
    tabIndex={0}
    role="tabpanel"
    id={`${id}-tab`}
    aria-labelledby={id}
    hidden={!selected}
  >
    {children}
  </div>
);

const Tabs = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);
  const onKeyDown = useCallback(
    e => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setActiveTab(activeTab + 1 === content.length ? 0 : activeTab + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setActiveTab(activeTab === 0 ? content.length - 1 : activeTab - 1);
          break;
        case "Home":
          e.preventDefault();
          setActiveTab(0);
          break;
        case "End":
          e.preventDefault();
          setActiveTab(content.length - 1);
          break;
        default:
          break;
      }
    },
    [activeTab, content.length, setActiveTab]
  );

  return (
    <div>
      <TabList label="Entertainment" onKeyDown={onKeyDown}>
        {content.map((tab, i) => (
          <Tab
            key={i}
            index={i}
            selected={activeTab === i}
            id={tab.title}
            onClick={setActiveTab}
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>
      {content.map((tab, i) => (
        <TabPanel key={i} id={tab.title} selected={activeTab === i}>
          {tab.panel}
        </TabPanel>
      ))}
    </div>
  );
};

function App() {
  const content = [
    {
      title: "Nils Frahm",
      panel: (
        <p>
          Nils Frahm is a German musician, composer and record producer based in
          Berlin. He is known for combining classical and electronic music and
          for an unconventional approach to the piano in which he mixes a grand
          piano, upright piano, Roland Juno-60, Rhodes piano, drum machine, and
          Moog Taurus.
        </p>
      )
    },
    {
      title: "Agnes Obel",
      panel: (
        <p>
          Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first
          album, Philharmonics, was released by PIAS Recordings on 4 October
          2010 in Europe. Philharmonics was certified gold in June 2011 by the
          Belgian Entertainment Association (BEA) for sales of 10,000 Copies.
        </p>
      )
    },
    {
      title: "Joke",
      panel: (
        <>
          <p>Fear of complicated buildings:</p>
          <p>A complex complex complex.</p>
        </>
      )
    }
  ];
  return (
    <div className={styles.Wrapper}>
      <Tabs content={content} />
    </div>
  );
}

export default App;
