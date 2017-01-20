/**
 * Checks that tick labels belonging to child points are properly indented.
 */
QUnit.test('Indentation', function (assert) {
    var chart = Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                marginLeft: 150,
                marginRight: 150
            },
            title: {
                text: 'Highcharts GridAxis'
            },
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [{
                title: '',
                grid: true,
                type: 'tree-grid',
                tree: [{
                    id: '1',
                    text: 'Node 1'
                }, {
                    id: '2',
                    parent: '1',
                    text: 'Node 2'
                }, {
                    id: '3',
                    parent: '2',
                    text: 'Node 3'
                }]
            }],
            series: [{
                name: 'Project 1',
                data: [{
                    x: Date.UTC(2014, 10, 18),
                    y: 0
                }, {
                    x: Date.UTC(2014, 10, 20),
                    y: 1
                }, {
                    x: Date.UTC(2014, 10, 23),
                    y: 2
                }]
            }]
        }),
        treeGrid = chart.yAxis[0],
        ticks = treeGrid.ticks,
        tickPositions = treeGrid.tickPositions,
        tick1 = ticks[tickPositions[0]].label.getBBox(),
        tick2 = ticks[tickPositions[1]].label.getBBox(),
        tick3 = ticks[tickPositions[2]].label.getBBox();

    assert.ok(
        tick2.x > tick1.x,
        'Child point level 1 (Node 2) farther right than parent (Node 1)'
    );

    assert.ok(
        tick3.x > tick2.x,
        'Child point level 2 (Node 3) farther right than parent (Node 1)'
    );
});