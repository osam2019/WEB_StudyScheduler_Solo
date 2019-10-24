<template>
    <div id = "app">
        <div id = "nav">
            <div class = "menu">
                <toggle-button
                        @change = "toggle"
                        :value = "value"
                        :labels = "labels"
                        width = "300" height = "40" font-size = "20">
                </toggle-button>
            </div>

            <div class = "body">
                <div id = "calendar" v-if = "value">
                    <vue-cal selected-date = "2019-10-25"
                             :time-from = "9 * 60"
                             :time-to = "19 * 60"
                             :disable-views = "['years', 'year', 'month']"
                             :events = "event"
                             :on-event-click = "onEventClick">
                    </vue-cal>
                </div>
                <div id = "manager" v-else>
                    <div id = "searchbar">
                        <el-input placeholder = "Search" class = "input-with-select" >
                            <el-select placeholder = "Select" slot = "prepend">
                                <el-option label = "Type1" value = "1"></el-option>
                                <el-option label = "Type2" value = "2"></el-option>
                                <el-option label = "Type3" value = "3"></el-option>
                            </el-select>
                            <el-button slot = "append" icon = "el-icon-search"></el-button>
                        </el-input>
                    </div>
                    <div id = "add">
                        <el-button @click = "open = true" type = "primary" icon = "el-icon-circle-plus-outline">Add Study</el-button>
                    </div>

                    <!-- pop up screen-->
                    <div id = "popup">
                        <vue-modaltor :visible = "open" @hide = "hideModal">

                            <div>
                                <p class = "popuplist">
                                    Study Title
                                </p>
                                <div class = "popupinput">
                                    <el-input placeholder = "ex> Computer Architecture Study" v-model = "title"></el-input>
                                </div>
                            </div>

                            <div style = "clear: both; height: 0; overflow: hidden;">

                            </div>

                            <br>

                            <div>
                                <p class = "popuplist">
                                    Start Time
                                </p>
                                <div class = "popupinput">
                                    <el-input placeholder = "ex> 2019-10-23 15:00" v-model = "stime"></el-input>
                                </div>
                            </div>


                            <div style = "clear: both; height: 0; overflow: hidden;">

                            </div>
                            <br>

                            <div>
                                <p class = "popuplist">
                                    End Time
                                </p>
                                <div class = "popupinput">
                                    <el-input placeholder = "ex> 2019-10-23 10:00" v-model = "etime"></el-input>
                                </div>
                            </div>


                            <div style = "clear: both; height: 0; overflow: hidden;">

                            </div>
                            <br>

                            <div>
                                <p class = "popuplist">
                                    Content
                                </p>
                                <div class = "popupinput">
                                    <el-input type = "textarea"
                                              placeholder = "ex> Chapter 2 instructions"
                                              maxlength = "100"
                                              v-model = "content"
                                              show-word-limit>
                                    </el-input>
                                </div>
                            </div>


                            <div style = "clear: both; height: 0; overflow: hidden;">

                            </div>
                            <br>

                            <div class = "popuplist" style = "margin : 50px 0px 0px 0px; float : right; padding: 0px">
                                <el-button @click = "create" type = "primary" icon = "el-icon-circle-plus-outline">
                                    Add Study
                                </el-button>
                            </div>

                            <div style = "clear: both; height: 0; overflow: hidden;">

                            </div>



                        </vue-modaltor>

                        <div id = "list">
                            <el-table :data = "event" stripe>
                                <el-table-column prop = "start" label = "Start" width = "180"></el-table-column>
                                <el-table-column prop = "end" label = "End" width = "180"></el-table-column>
                                <el-table-column prop = "title" label = "Title" width = "300"></el-table-column>
                                <el-table-column prop = "content" label = "Content" width = "180"></el-table-column>
                                <el-table-column label = "Add" width = "180">
                                    <el-button type = "primary" icon = "el-icon-circle-plus-outline"></el-button>
                                </el-table-column>
                            </el-table>
                        </div>

                    </div>



                </div>


            </div>


        </div>
    </div>
</template>


<!-- JavaScript code starts here -->
<script>
    import axios from 'axios';
    const baseURL = "http://localhost:3000/event"
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    export default{
        name : 'menu',
        components : {VueCal},

        data(){
            return{
                event : [],
                value : true,
                open : false,
                title : "",
                content : "",
                stime : "",
                etime : "",
                labels :
                    {
                        checked : 'Study Timeline',
                        unchecked : 'Search Study'
                    }
            }
        },

        async created(){
            try{
                const res = await axios.get(baseURL)
                this.event = res.data;
            }
            catch(e){
                console.error(e)
            }
        },
        methods : {
            toggle(){
                this.value = !this.value;
            },
            hideModal(){
                this.open = false;
            },
            create(){
                if(this.title == "" || this.content == "" || this.stime == "" || this.etime == ""){
                    alert("Make sure you have no black inputs")
                }
                else{
                    alert(this.title)
                    this.addevent();
                    this.hideModal();

                }
            },
            async addevent() {
                const res = await axios.post(baseURL, {start : this.stime, end : this.etime, title : this.title, content : this.content})
                this.event = [...this.event, res.data]
                this.stime = ""
                this.etime = ""
                this.title = ""
                this.content = ""
            }

        }
    }

</script>

<style>
    @import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");
    #nav {
      text-align : center;
    }
    .menu, .body{
        display : inline-block;
        margin : 30px 0px 0px 0px;
        text-align : center;
        width : 75%;
    }
    #manager, #searchbar, #add{
        display : inline-block;
    }
    #searchbar{
        width : 450px;
        margin-right : 15px;
        float : left;
    }
    #add{
        float : left;
        width : 20%
    }
    .popuplist{
        float : left;
        width : 300px;
        padding-top : 5px;
        padding-right : 10px;
        padding-left : 10px;
        margin : 0px;
        height : 40px;
        display : inline-block;
    }
    .popupinput{
        float : left;
        width : 700px;
        height : 40px;
        display : inline-block;
    }


</style>