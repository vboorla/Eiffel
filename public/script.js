var days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
var daynum = [-3, -2, -1, 0, 1, 2, 3]
var stepCount = [7000, 10000, 15000, 25000, 15000, 10000, 7000];
var steps = [];
var height = 15000;
var ctx = document.getElementById("myChart");
var maxStepsInput = document.getElementById("maxSteps");
var steepnessInput = document.getElementById("steepness");
var steepness = steepnessInput.value;
//rgba(255, 255, 255, 0.01) #ffbb00
var datasets = [
    {
        label: "Step count",
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        borderColor: '#2196F3',
        data: steps
      }
    ];

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: datasets
    }
});
computeEiffel();

function computeEiffel() {
    steepness = steepnessInput.value;
    height = maxStepsInput.value;
    for (var i = 0; i < daynum.length; i++) {
        var x = daynum[i];
        let stepsCurr = height * Math.pow(steepness, -Math.abs(x));
        steps[i] = Math.round(stepsCurr / 1000) * 1000;
    }
    myChart.update();
}

$(document).ready(function () {
    buildPage();

})

function buildPage() {
    $('#usersList').html(' ');
    $.getJSON('/users', function (data) {

        $.each(data.users, function (i, value) {
            var el = '<li><input type="text" name="user" value="' + value.user + '">';
            el += '<input type="number" class="day" name="monday" value="' + value.monday + '">';
            el += '<input type="number" class="day" name="tuesday" value="' + value.tuesday + '">';
            el += '<input type="number" class="day" name="wednesday" value="' + value.wednesday + '">';
            el += '<input type="number" class="day" name="thursday" value="' + value.thursday + '">';
            el += '<input type="number" class="day" name="friday" value="' + value.friday + '">';
            el += '<input type="number" class="day" name="saturday" value="' + value.saturday + '">';
            el += '<input type="number" class="day" name="sunday" value="' + value.sunday + '">';
            el += '<input type="hidden" name="id" value="' + value.id + '">';
            el += '<span class="edit">  Save</span><span class="graph">Draw</span>';
            el += '<span class="viewLink"><a href="/users/' + value.id + '" target="_blank">View</a></span><span class="remove">x</span></li>';
            var listNew = $(el);
            listNew.data('user', value);
            $('#usersList').append(listNew);
        })
    })
}

$('#usersList').on('click', '.graph', function () {
    var data = $(this).parent().find('input').serialize();
    var id = $(this).parent().find('input[name="id"]').val();
    $.ajax({
        url: '/users/' + id,
        type: 'GET',
        data: data,
        success: function (res) {
            //console.log(res);
            let userDataset = {};
            let userSteps = [];

            let temp = datasets.indexOf(getUser(res.user));
            if (temp == -1) {
                userDataset.label = res.user;
                userDataset.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                userDataset.borderColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                datasets.push(userDataset);
            } else {
                //console.log(getUser(res.user));
                userDataset = getUser(res.user);
                datasets.splice(temp, 1);
                datasets.push(userDataset);
            }
            $.each(res, function (key, value) {
                if (key != 'id' && key !== 'user') {
                    let p = parseInt(value);
                    //isNaN(p) ? console.log(userSteps) : userSteps.push(p);
                    (p === 0) ? '' : userSteps.push(p);
                }
            });

            userDataset.data = userSteps;

            // console.log(datasets);
            myChart.update();
        }
    })

})

function getUser(label) {
    for (let item of datasets) {
        //console.log(item);
        if (item.label == label) return item;
    }
    return "User does not exist with this ID";
}
