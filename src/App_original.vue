
<template>
    <div id="app">
        <div id="nav">
            <!--
            <router-link to="/">Home</router-link> |
            <router-link to="/Schedule">Schedule</router-link> |
            <router-link to="/Search">Search Study</router-link>
            -->

            <div>
                <toggle-button id = "button" @change = "eventhandler" width = "300" height = "40" :value="value" font-size = "20"
                               :labels="{checked: 'Study Timeline', unchecked: 'Search Study'}"/>
            </div>


            <div v-if = "value" style = "text-align : center">
                <div style = "display : inline-block; width : 50%">
                    <vue-cal selected-date="2019-10-23"
                             :time-from="9 * 60"
                             :time-to="19 * 60"
                             :disable-views="['years', 'year', 'month']"
                             :events="events"
                             style = "width : auto"
                             :on-event-click="onEventClick">
                    </vue-cal>
                </div>
            </div>

            <div v-else style = "text-align : center">
                <div style = " display : inline-block;  width : 50%">
                    <el-input placeholder="Please input" v-model="input3" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="Select">
                            <el-option label="Type1" value="1"></el-option>
                            <el-option label="Type2." value="2"></el-option>
                            <el-option label="Type3" value="3"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div style = "padding-left : 20px; display : inline-block">
                    <el-button  @click="open=true" type = "primary" icon = "el-icon-circle-plus-outline">Add Study</el-button>
                </div>


                <div>
                    <vue-modaltor  :visible="open" @hide="hideModal">
                        <div>
                            <p style = "display : inline-block; float:left; width : 100px; height : 30px; padding : 5px; margin : 0px">
                                Study Title
                            </p>
                            <div style = "float : left;">
                                <el-input placeholder = "ex> Computer Architecture Study"  style = "width : 500px">
                                </el-input>
                            </div>

                            <br></br>

                            <p style = "display : inline-block; float:left; width : 100px; height : 30px; padding : 5px; margin : 0px">
                                Start time
                            </p>
                            <div style = "float : left;">
                                <el-input placeholder = "ex> 2019-10-23 10:00"  style = "width : 500px">
                                </el-input>
                            </div>

                            <br></br>

                            <p style = "display : inline-block; float:left; width : 100px; height : 30px; padding : 5px; margin : 0px">
                                End time
                            </p>
                            <div style = "float : left;">
                                <el-input placeholder = "ex> 2019-10-23 15:00"  style = "width : 500px">
                                </el-input>
                            </div>

                            <br></br>

                            <p style = "display : inline-block; float:left; width : 100px; height : 30px; padding : 5px; margin : 0px">
                                Content
                            </p>
                            <div style = "float : left;">
                                <el-input
                                        type="textarea"
                                        placeholder="ex > Chapter 2 Instructions"
                                        v-model="textarea"
                                        maxlength="100"
                                        show-word-limit
                                        style = "width : 500px"
                                >
                                </el-input>
                            </div>

                            <br></br>

                            <div style = "float : right">
                                <el-button type = "primary" icon = "el-icon-circle-plus-outline">Add</el-button>

                            </div>

                        </div>
                    </vue-modaltor>

                </div>

                <div style = "margin-top : 20px; display : inline-block; width : 63.3%">
                    <template>
                        <el-table
                                :data="events"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="start"
                                    label="Start"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="end"
                                    label="End"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="title"
                                    label="Title"
                                    width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="content"
                                    label="Content">
                            </el-table-column>
                        </el-table>
                    </template>

                </div>



            </div>

        </div>


    </div>
    </div>

</template>

<script>
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'

    export default{
        name : 'menu',
        components : {VueCal},

        data() {
            return{
                value : true,
                open : false,
                input : '',
                events: [
                    {
                        start: '2019-10-20 14:00',
                        end: '2019-10-20 18:00',
                        title: 'Computer Architecture Study',
                        content: 'Chapter 2 : Instructions',
                    },
                    {
                        start: '2019-10-23 10:00',
                        end: '2019-10-23 15:00',
                        title: 'Vue.JS Study',
                        content: 'Lesson 2 : Vue Store',
                    },
                    {
                        start: '2019-10-22 11:00',
                        end: '2019-10-22 16:00',
                        title: 'Mock Up JSON Study',
                        content: 'Lesson 3 : AXIOS',
                    },
                    {
                        start: '2019-10-25 11:00',
                        end: '2019-10-25 16:00',
                        title: 'React.JS Study',
                        content: 'Lesson 4 : FrontEnd',
                    }
                ]
            }
        },
        methods : {
            eventhandler : function(){
                this.value = !this.value
            },
            hideModal(){
                this.open = false
            }
        }

    }

</script>


<style>
    @import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    #button {
        margin : 30px;
    }

    .vuecal__event {cursor: pointer;}

    .vuecal__event-title {
        font-size: 1.2em;
        font-weight: bold;
        margin: 4px 0 8px;
    }

    .vuecal__event-time {
        display: inline-block;
        margin-bottom: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .vuecal__event-content {
        font-style: italic;
    }

    .custom-icon {
        font-size: 20px;
    }

</style>

