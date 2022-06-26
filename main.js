//定义变量

//初始化名称
var get_classname = ['语文', '英语', '数学'];
//var get_name = ['小明', '小红', '小张'];
var get_name = ['新建学生'];
/*var inner_cells = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];*/
var inner_cells = [
    [null, null, null]
];

//表格信息「表格高度，宽度」
var tab_hi = 3;
var tab_wi = 4;


//检测是否是新用户
var newuserr = localStorage.getItem("newuser");

//平均数
var average_firstTime = false;

//总分
var totalsum_firstTime = false;

//学生最高分
var stu_hi_firstTime = false;

//学生平均分
var average_stu_firstTime = false;

//学科总分
var totalsum_sub_firstTime = false;

//学科最高分
var stu_hi_sub_firstTime = false;

//初始化
function initialize() {
    if (newuserr == null) {
        //新用户
        localStorage.setItem("get_classname", JSON.stringify(get_classname));
        localStorage.setItem("get_name", JSON.stringify(get_name));
        //localStorage.setItem("tab_hi", "3");
        localStorage.setItem("tab_hi", "1");
        localStorage.setItem("tab_wi", "4");
        localStorage.setItem("inner_cells", JSON.stringify(inner_cells));
        localStorage.setItem("tiname", "我的分数统计器");
        localStorage.setItem("newuser", "n");
        location.reload();
    } else {
        //初始化内容
        tab_h();
        tab_w();
        tab_get_it();
        tab_get(true);
        get_cells();
        average();
        average_stu();
        totalsum_sub();
        totalsum();
        stu_hi_sub();
        stu_hi();
        back_coler();
    }
}

//获取表格信息
//表格高度
function tab_h(number) {
    tab_hi = localStorage.getItem("tab_hi");
    Number(tab_hi);
    if (number == 1) {
        localStorage.setItem("tab_hi", Number(tab_hi) + 1);
    }
}
//表格宽度
function tab_w(number) {
    tab_wi = localStorage.getItem("tab_wi");
    Number(tab_wi);
    if (number == 1) {
        localStorage.setItem("tab_wi", Number(tab_wi) + 1);
    }
}

//生成表格框架
function tab_get($firstTime) {
    //检测是否是第一次
    //如果是，则执行删除
    if ($firstTime != true) {
        try {
            for (var tt = 0; tt < get_classname.length; tt++) {
                document.getElementById("s" + tt).remove();
            }
            for (var gg = 0; gg < get_name.length; gg++) {
                document.getElementById("h" + gg).remove();
            }
        } catch (error) {
            if ($firstTime == "new_sub") {
                for (var gg = 0; gg < get_name.length; gg++) {
                    document.getElementById("h" + gg).remove();
                }
            }
        }
    }
    //生成科目
    for (var t = 0; t < get_classname.length; t++) {
        var tab = document.getElementById("top_bar");
        var new_cells_th = document.createElement("th");
        new_cells_th.scope = "col";
        new_cells_th.id = "s" + t;
        new_cells_th.style.backgroundColor = "rgb(133, 133, 133)";
        new_cells_th.innerHTML = get_classname[t];
        new_cells_th.contentEditable = true;
        tab.append(new_cells_th);
    }
    //生成学生
    for (var g = 0; g < get_name.length; g++) {
        var tab = document.getElementById("table");
        var new_student = document.createElement("tbody");
        var new_tr = document.createElement("tr");
        new_student.id = "new_tr";
        for (n = 0; n <= get_classname.length; n++) {
            if (n < 1) {
                var new_cells_th = document.createElement("th");
                new_cells_th.innerHTML = get_name[g];
                new_cells_th.id = "h" + g + "w" + n;
                new_cells_th.contentEditable = true;
                new_cells_th.style.backgroundColor = "rgb(198, 198, 198)";
                new_tr.append(new_cells_th);
            } else {
                var new_cells = document.createElement("td");
                new_cells.innerHTML = "";
                new_cells.style.backgroundColor = "rgba(255, 255, 255, 0.80)";
                new_cells.id = "h" + g + "w" + n;
                new_cells.contentEditable = true;
                new_tr.append(new_cells);
            }
        }
        new_tr.id = "h" + g;
        new_student.append(new_tr);
        tab.append(new_student);
    }
    tab_save();
}

//保存表格题目
function tchenge() {
    localStorage.setItem("tiname", document.getElementById("tiname").innerHTML);
}

//获取表格内部信息
//通过内容修改触发
function chenge() {
    //学科名
    for (var r = 0; r < (tab_wi - 1); r++) {
        get_classname[r] = document.getElementById("s" + r).innerHTML;
    }
    localStorage.setItem("get_classname", JSON.stringify(get_classname));
    //学生名
    for (var l = 0; l < tab_hi; l++) {
        get_name[l] = document.getElementById("h" + l + "w0").innerHTML;
    }
    localStorage.setItem("get_name", JSON.stringify(get_name));
    //内部信息
    for (var x = 0; x < tab_hi; x++) {
        for (var xx = 1; xx < tab_wi; xx++) {
            inner_cells[x][(xx - 1)] = document.getElementById("h" + x + "w" + xx).innerHTML;
            console.log("目前表格：" + "h" + x + "w" + xx + "     " + "目前数组值：" + inner_cells[x][(xx - 1)]);
        }
    }
    tab_save();
    localStorage.setItem("inner_cells", JSON.stringify(inner_cells));
    average();
    average_stu();
    totalsum();
    totalsum_sub();
    stu_hi_sub();
    stu_hi();
}

//填充表格内部信息
function get_cells() {
    /*
    把变量填充至表格内部
    */
    //表格题目
    document.getElementById("tiname").innerHTML = localStorage.getItem("tiname");
    //学科名
    get_classname = JSON.parse(localStorage.getItem("get_classname"));
    for (var rr = 0; rr < (tab_wi - 1); rr++) {
        document.getElementById("s" + rr).innerHTML = get_classname[rr];
    }
    //学生名
    get_name = JSON.parse(localStorage.getItem("get_name"));
    for (var ll = 0; ll < tab_hi; ll++) {
        document.getElementById("h" + ll + "w0").innerHTML = get_name[ll];
    }
    //内部信息
    inner_cells = JSON.parse(localStorage.getItem("inner_cells"));
    for (var y = 0; y < tab_hi; y++) {
        for (var yy = 1; yy < tab_wi; yy++) {
            document.getElementById("h" + y + "w" + yy).innerHTML = inner_cells[y][(yy - 1)];
        }
    }

}

//获取学科，学生数据
function tab_get_it() {
    get_classname = JSON.parse(localStorage.getItem("get_classname"));
    get_name = JSON.parse(localStorage.getItem("get_name"));
}

//保存学科，学生数据
function tab_save() {
    localStorage.setItem("get_classname", JSON.stringify(get_classname));
    localStorage.setItem("get_name", JSON.stringify(get_name));
}

//新建学科
function new_sub() {
    chenge();
    tab_w(1);
    tab_h();
    tab_w();
    var get_classname_length = get_classname.length;
    get_classname[get_classname_length] = "新建科目";
    for (var vw = 0; vw < tab_hi; vw++) {
        inner_cells[vw].push("");
    }
    localStorage.setItem("inner_cells", JSON.stringify(inner_cells));
    tab_get('new_sub');
    location.reload();
}

//新建学生
function new_student() {
    chenge();
    tab_h(1);
    tab_h();
    tab_w();
    var get_name_length = get_name.length;
    get_name[get_name_length] = "新建学生";
    var arr = new Array(tab_wi - 1);
    for (var vv = 0; vv < tab_wi - 1; vv++) {
        arr[vv] = "";
    }
    inner_cells.push(arr);
    localStorage.setItem("inner_cells", JSON.stringify(inner_cells));
    tab_save();
    tab_get(false);
    get_cells();
    tab_get_it();
    location.reload();
}

//学科平均数
function average() {
    if (localStorage.getItem("tab_hi") < 2) {} else {
        tab_h();
        tab_w();
        if (average_firstTime == true) {
            document.getElementById("average").remove();
        }
        var tab = document.getElementById("table");
        var new_student = document.createElement("tbody");
        new_student.id = "average";
        var new_tr = document.createElement("tr");
        var new_cells_th = document.createElement("th");
        new_cells_th.innerHTML = "平均分";
        new_cells_th.style.backgroundColor = "#fcf5a7";
        new_tr.append(new_cells_th);
        for (var ave = 1; ave < Number(tab_wi); ave++) {
            var averagee = 0;
            for (var avee = 0; avee < Number(tab_hi); avee++) {
                averagee = averagee + Number(document.getElementById("h" + avee + "w" + ave).innerHTML);
            }
            averagee = averagee / Number(tab_hi) - 1;
            averagee = Number(averagee).toFixed(2);
            var new_cells = document.createElement("td");
            new_cells.style.backgroundColor = "#fffce3";
            new_cells.innerHTML = averagee;
            new_tr.append(new_cells);
        }
        new_student.append(new_tr);
        tab.append(new_student);
        average_firstTime = true;
    }
}

//学生平均分
function average_stu(dil) {
    tab_h();
    tab_w();
    if (average_stu_firstTime == true && dil != "no") {
        document.getElementById("title_average_stu").remove();
        for (var aved = 0; aved < Number(tab_hi); aved++) {
            document.getElementById("totalsum" + aved).remove();
        }
        dil = null;
    }

    //总分题目
    var tab = document.getElementById("top_bar");
    var new_cells_th = document.createElement("th");
    new_cells_th.scope = "col";
    new_cells_th.style.backgroundColor = "#fcf5a7";
    new_cells_th.id = "title_average_stu";
    new_cells_th.innerHTML = "平均分";
    tab.append(new_cells_th);
    //总分内容
    for (var ave = 0; ave < Number(tab_hi); ave++) {
        var average_stu = 0;
        var tab = document.getElementById("h" + ave);
        var new_td = document.createElement("td");
        for (var avee = 1; avee < Number(tab_wi); avee++) {
            average_stu = average_stu + Number(document.getElementById("h" + ave + "w" + avee).innerHTML);
        }
        average_stu = average_stu / Number(tab_wi);
        average_stu = Number(average_stu).toFixed(2);
        new_td.style.backgroundColor = "#fffce3";
        new_td.innerHTML = average_stu;
        new_td.id = "totalsum" + ave;
        tab.append(new_td);
        average_stu_firstTime = true;
    }

}

//学科总分
function totalsum_sub() {
    if (localStorage.getItem("tab_hi") < 2) {} else {
        tab_h();
        tab_w();
        if (totalsum_sub_firstTime == true) {
            document.getElementById("totalsum_sub").remove();
        }
        var tab = document.getElementById("table");
        var new_student = document.createElement("tbody");
        new_student.id = "totalsum_sub";
        var new_tr = document.createElement("tr");
        var new_cells_th = document.createElement("th");
        new_cells_th.innerHTML = "总分";
        new_cells_th.style.backgroundColor = "#fcf5a7";
        new_tr.append(new_cells_th);
        for (var ave = 1; ave < Number(tab_wi); ave++) {
            var totalsum_sub = 0;
            for (var avee = 0; avee < Number(tab_hi); avee++) {
                totalsum_sub = totalsum_sub + Number(document.getElementById("h" + avee + "w" + ave).innerHTML);
            }
            totalsum_sub = Number(totalsum_sub).toFixed(2);
            var new_cells = document.createElement("td");
            new_cells.style.backgroundColor = "#fffce3";
            new_cells.innerHTML = totalsum_sub;
            new_tr.append(new_cells);
        }
        new_student.append(new_tr);
        tab.append(new_student);
        totalsum_sub_firstTime = true;
    }
}

//学生总分
function totalsum(dil) {
    tab_h();
    tab_w();
    if (totalsum_firstTime == true && dil != "no") {
        document.getElementById("title_totalsum").remove();
        for (var aved = 0; aved < Number(tab_hi); aved++) {
            document.getElementById("totalsum" + aved).remove();
        }
        dil = null;
    }

    //总分题目
    var tab = document.getElementById("top_bar");
    var new_cells_th = document.createElement("th");
    new_cells_th.scope = "col";
    new_cells_th.style.backgroundColor = "#fcf5a7";
    new_cells_th.id = "title_totalsum";
    new_cells_th.innerHTML = "总分";
    tab.append(new_cells_th);
    //总分内容
    for (var ave = 0; ave < Number(tab_hi); ave++) {
        var totalsumm = 0;
        var tab = document.getElementById("h" + ave);
        var new_td = document.createElement("td");
        for (var avee = 1; avee < Number(tab_wi); avee++) {
            totalsumm = totalsumm + Number(document.getElementById("h" + ave + "w" + avee).innerHTML);
        }
        totalsumm = Number(totalsumm).toFixed(2);
        new_td.style.backgroundColor = "#fffce3";
        new_td.innerHTML = totalsumm;
        new_td.id = "totalsum" + ave;
        tab.append(new_td);
        totalsum_firstTime = true;
    }

}

//学科最高分
function stu_hi_sub() {
    if (localStorage.getItem("tab_hi") < 2) {} else {
        tab_h();
        tab_w();
        if (stu_hi_sub_firstTime == true) {
            document.getElementById("stu_hi_sub").remove();
        }
        var tab = document.getElementById("table");
        var new_student = document.createElement("tbody");
        new_student.id = "stu_hi_sub";
        var new_tr = document.createElement("tr");
        var new_cells_th = document.createElement("th");
        new_cells_th.innerHTML = "最高分";
        new_cells_th.style.backgroundColor = "#fcf5a7";
        new_tr.append(new_cells_th);
        for (var ave = 1; ave < Number(tab_wi); ave++) {
            var stu_hi_sub = 0;
            for (var avee = 0; avee < Number(tab_hi); avee++) {
                if (stu_hi_sub < Number(document.getElementById("h" + avee + "w" + ave).innerHTML)) {
                    stu_hi_sub = Number(document.getElementById("h" + avee + "w" + ave).innerHTML);
                }
            }
            stu_hi_sub = Number(stu_hi_sub).toFixed(2);
            var new_cells = document.createElement("td");
            new_cells.style.backgroundColor = "#fffce3";
            new_cells.innerHTML = stu_hi_sub;
            new_tr.append(new_cells);
        }
        new_student.append(new_tr);
        tab.append(new_student);
        stu_hi_sub_firstTime = true;
    }
}

//学生最高分
function stu_hi(dil) {
    tab_h();
    tab_w();
    if (stu_hi_firstTime == true && dil != "no") {
        document.getElementById("title_stu_hi").remove();
        for (var aved = 0; aved < Number(tab_hi); aved++) {
            document.getElementById("stu_hi" + aved).remove();
        }
        dil = null;
    }

    //总分题目
    var tab = document.getElementById("top_bar");
    var new_cells_th = document.createElement("th");
    new_cells_th.scope = "col";
    new_cells_th.style.backgroundColor = "#fcf5a7";
    new_cells_th.id = "title_stu_hi";
    new_cells_th.innerHTML = "最高分";
    tab.append(new_cells_th);
    //总分内容
    for (var ave = 0; ave < Number(tab_hi); ave++) {
        var stu_him = 0;
        var tab = document.getElementById("h" + ave);
        var new_td = document.createElement("td");
        for (var avee = 1; avee < Number(tab_wi); avee++) {
            if (avee == 1) {
                stu_him = Number(document.getElementById("h" + ave + "w" + avee).innerHTML);
            } else {
                if (document.getElementById("h" + ave + "w" + avee).innerHTML > stu_him) {
                    stu_him = Number(document.getElementById("h" + ave + "w" + avee).innerHTML);
                }
            }
        }
        new_td.style.backgroundColor = "#fffce3";
        new_td.innerHTML = stu_him;
        new_td.id = "stu_hi" + ave;
        tab.append(new_td);
        stu_hi_firstTime = true;
    }

}


//清除所有数据
function clearer() {
    if (confirm("确认清除记录?!") == true) {
        localStorage.clear();
        location.reload();
    } else {

    }
}

//更改背景颜色
var abc;
var abc_first = true;

function back_coler() {
    var bcoler = "antiquewhite";
    if (abc_first == false) abc = Math.round(Math.random() * 50);
    if (abc_first == true) abc = Number(localStorage.getItem("back_coler"));
    localStorage.setItem("back_coler", abc);
    if (abc == 0) bcoler = "background-image: antiquewhite;";
    if (abc == 1) bcoler = "background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);";
    if (abc == 2) bcoler = "background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);";
    if (abc == 3) bcoler = "background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);";
    if (abc == 4) bcoler = "background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);";
    if (abc == 5) bcoler = "background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);";
    if (abc == 6) bcoler = "background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);";
    if (abc == 7) bcoler = "background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);";
    if (abc == 8) bcoler = "background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);";
    if (abc == 9) bcoler = "background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);";
    if (abc == 10) bcoler = "background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);";
    if (abc == 11) bcoler = "background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);";
    if (abc == 12) bcoler = "background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);";
    if (abc == 13) bcoler = "background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);";
    if (abc == 14) bcoler = "background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);";
    if (abc == 15) bcoler = "background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);";
    if (abc == 16) bcoler = "background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);";
    if (abc == 17) bcoler = "background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);";
    if (abc == 18) bcoler = "background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);";
    if (abc == 19) bcoler = "background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);";
    if (abc == 20) bcoler = "background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);";
    if (abc == 21) bcoler = "background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);";
    if (abc == 22) bcoler = "background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);";
    if (abc == 23) bcoler = "background-image: linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);";
    if (abc == 24) bcoler = "background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%);";
    if (abc == 25) bcoler = "background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);";
    if (abc == 26) bcoler = "background-image: linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%);";
    if (abc == 27) bcoler = "background-image: linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%);";
    if (abc == 28) bcoler = "background-image: linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);";
    if (abc == 29) bcoler = "background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);";
    if (abc == 30) bcoler = "background-image: linear-gradient(to top, #09203f 0%, #537895 100%);";
    if (abc == 31) bcoler = "background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);";
    if (abc == 32) bcoler = "background-image: linear-gradient(to right, #a8caba 0%, #5d4157 100%);";
    if (abc == 33) bcoler = "background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);";
    if (abc == 34) bcoler = "background-image: linear-gradient(to top, #e8198b 0%, #c7eafd 100%);";
    if (abc == 35) bcoler = "background-image: linear-gradient(to top, #cc208e 0%, #6713d2 100%);";
    if (abc == 36) bcoler = "background-image: linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%);";
    if (abc == 37) bcoler = "background-image: linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%);";
    if (abc == 38) bcoler = "background-image: linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%);";
    if (abc == 39) bcoler = "background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);";
    if (abc == 40) bcoler = "background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);";
    if (abc == 41) bcoler = "background-image: linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%);";
    if (abc == 42) bcoler = "background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);";
    if (abc == 43) bcoler = "background-image: linear-gradient(-225deg, #FF057C 0%, #7C64D5 48%, #4CC3FF 100%);";
    if (abc == 44) bcoler = "background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);";
    if (abc == 45) bcoler = "background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);";
    if (abc == 46) bcoler = "background-image: linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%);";
    if (abc == 47) bcoler = "background-image: linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%);";
    if (abc == 48) bcoler = "background-image: linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%);";
    if (abc == 49) bcoler = "background-image: linear-gradient(to right, #d7d2cc 0%, #304352 100%);";
    if (abc == 50) bcoler = "background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);";
    document.getElementById("back").style = bcoler;
    console.log("%c背景颜色加载成功:" + abc, 'color: #ff0000;text-shadow:2px 2px #000000;font-size:30px;' + bcoler);
    abc_first = false;
}

function resize() {
    var threshold = 200;
    var widthThreshold = window.outerWidth - window.innerWidth > threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
        console.log("%c请勿在控制台乱输入命令，后果自负！", 'color: #ff0000;text-shadow:2px 2px #000000;font-size:90px;');
        console.log("%c你可以使用我们的命令，输入‘help()’可以查询命令大全", 'color: #00ff08;text-shadow:2px 2px #000000;font-size:50px;');
    }
}
window.addEventListener('resize', resize);
resize();

function help() {
    console.clear();
    console.log("%c命令如下:", 'color: #faebd7;text-shadow:2px 2px #000000;font-size:40px;');
    console.log("%c随机更换背景颜色‘back_coler()’", 'font-size:20px;');
    console.log("%c清空所有数据‘clearer()’", 'font-size:20px;');
    console.log("%c新建学生‘new_student()’", 'font-size:20px;');
    console.log("%c新建科目‘new_sub()’", 'font-size:20px;');
    console.log("%c表格内容‘inner_cells’", 'font-size:20px;');
}