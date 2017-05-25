const initialWidgets = [
  {id: 1, color: 'Red', sprocketCount: 7, owner: 'John'},
  {id: 2, color: 'Taupe', sprocketCount: 1, owner: 'George'},
  {id: 3, color: 'Green', sprocketCount: 8, owner: 'Ringo'},
  {id: 4, color: 'Blue', sprocketCount: 2, owner: 'Paul'}
];
//这是在页面中widget这个tab显示的信息。如果request.session中有widget
//那么显示request.session中的widget，否则显示我们的initialWidgets
export function getWidgets(req) {
  let widgets = req.session.widgets;
  if (!widgets) {
    widgets = initialWidgets;
    req.session.widgets = widgets;
  }
  return widgets;
}

//这里是模拟异步请求
export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.random() < 0.01) {
        reject('Widget load fails 1% of the time. You were unlucky.');
      } else {
        resolve(getWidgets(req));
      }
    }, 1000); 
    // simulate async load
  });
}
