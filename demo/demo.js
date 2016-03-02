(function(){
var Task = window.task;

var welcome = function(data, options, task){
    alert('welcome');
    task.next();
}

var tallMeName = function(data, options, task){
    var name;
    if(task.data && task.data.name){
        name = prompt('你的名字是：' + task.data.name + '吗？不对请重新输入');
    } else {
        name = prompt('告诉我你的名字');
    }
    if(name || (task.data && task.data.name && name === "")){
        name && task.update({name: name});
        task.next();
    } else {
        task.cancel();
    }
}

var tallMePhone = function(data, options, task){
    var phone;
    if(task.data && task.data.phone){
        phone = prompt('你的电话是：' + task.data.phone + '吗？不对请重新输入');
    } else {
        phone = prompt('告诉我你的电话');
    }

    if(phone || (task.data && task.data.phone && phone === "")){
        phone && task.update({phone: phone});
        task.next();
    } else {
        task.cancel();
    }
}

var select = function(data, options, task){
    var select = confirm('确认告诉我手机，取消告诉我名字。');
    if(select){
        select = 'phone';
    } else {
        select = 'name';
    }
    task.update({type: select});
    task.next();
}

var success = function(data, options, task){
    var is_success;
    if(task.data.name){
        is_success = confirm(task.data.name + ' success; 确认完成，取消返回上一部');
    } else if(task.data.phone){
        is_success = confirm(task.data.phone + ' success; 确认完成，取消返回上一部');
    }
    if(is_success){
        task.next();
    } else {
        task.back();
    }
}


var myTask = new Task({
    tasks: {
        'tallMeName': ['welcome', 'tallMeName', 'success'],
        'tallMePhone': ['welcome', 'tallMePhone', 'success'],
        'tallMe': [
            'welcome',
            'select',
            [
                function(data, options, task){
                    if(task.data.type === 'phone'){
                        task.next();
                    } else {
                        task.go(5);
                    }
                }, {
                    notHistory: 1
                }
            ],
            'tallMePhone',
            [
                function(data, options, task){
                    task.go(7);
                }, {
                    notHistory: 1
                }
            ],
            'tallMeName',
            [
                function(data, options, task){
                    task.go(7);
                }, {
                    notHistory: 1
                }
            ],
            'success'
        ],
    },
    jobs: {
        'welcome': welcome,
        'select': select,
        'tallMeName': tallMeName,
        'tallMePhone': tallMePhone,
        'success': success
    }
})

document.getElementById('task1').onclick = function(){
    myTask.createTask('tallMeName').next();
}
document.getElementById('task2').onclick = function(){
    myTask.createTask('tallMePhone').next();
}
document.getElementById('task3').onclick = function(){
    myTask.createTask('tallMe').next();
}

})()
