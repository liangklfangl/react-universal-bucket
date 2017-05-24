"form": {
	//the name of your form and the key to where your form's state will be 
	//mounted under the redux-form reducer
    "widget": {
      "values": {
        "id": 1,
        "color": "Red",
        "sprocketCount": 7,
        "owner": "John"
      },
      "initial": {
        "id": 1,
        "color": "Red",
        "sprocketCount": 7,
        "owner": "John"
      }
    }
  }
/*
下面是我们使用redux-form时候的一些配置:
@reduxForm({
 form:"widget",
 fields: ['id', 'color', 'sprocketCount', 'owner']
})
 */