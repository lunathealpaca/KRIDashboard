import React, { useEffect } from 'react';


function TableauViz() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="tableauPlaceholder"
      id="vizContainer"
      style={{ position: 'relative', width: '1000px', height: '840px' }}
    >
      <object className="tableauViz" width="100%" height="100%">
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="path" value="views/KRIMetricsUofTdummy/IsraRiskDetail" />
        <param name="toolbar" value="yes" />
        <param name="language" value="zh-CN" />
        <param name="publish" value="yes" />
        <param name="display_count" value="n" />
      </object>
    </div>
  );
}

export default TableauViz;
