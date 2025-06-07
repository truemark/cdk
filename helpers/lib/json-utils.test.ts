import {replaceJsonFields} from './json-utils';

describe('replaceJsonFields', () => {
  test('Replaces placeholders in JSON template', () => {
    const sampleJson = {
      title: '{{title}}',
      panels: [
        {title: '{{panelTitle}}', type: 'graph', datasource: 'Prometheus'},
      ],
    };

    const updatedJson = replaceJsonFields(sampleJson, {
      title: 'My Custom Dashboard',
      panelTitle: 'CPU Usage',
    });

    expect(updatedJson).toEqual({
      title: 'My Custom Dashboard',
      panels: [{title: 'CPU Usage', type: 'graph', datasource: 'Prometheus'}],
    });
  });

  test('Returns original JSON if no placeholders match', () => {
    const sampleJson = {
      title: 'Static Title',
      panels: [{title: 'Fixed Panel', type: 'graph', datasource: 'Prometheus'}],
    };

    const updatedJson = replaceJsonFields(sampleJson, {title: 'New Title'});

    expect(updatedJson).toEqual(sampleJson); // No placeholders were found
  });

  test('Handles empty fields object gracefully', () => {
    const sampleJson = {
      title: '{{title}}',
      panels: [
        {title: '{{panelTitle}}', type: 'graph', datasource: 'Prometheus'},
      ],
    };

    const updatedJson = replaceJsonFields(sampleJson, {}); // No replacements

    expect(updatedJson).toEqual(sampleJson); // Should remain unchanged
  });

  test('Handles missing placeholders gracefully', () => {
    const sampleJson = {
      title: 'No Placeholder Here',
      panels: [
        {title: 'Static Panel', type: 'graph', datasource: 'Prometheus'},
      ],
    };

    const updatedJson = replaceJsonFields(sampleJson, {title: 'New Title'});

    expect(updatedJson).toEqual(sampleJson); // Should remain unchanged
  });
});
