new Vue({

    el: '#topdeskCli',

    data: 
    {
        inputField: '',
        output: '',
    },

    computed: {
        imagePath: function() {
            return this.gender === 'female' ? 'kristy.png' : 'matthew.png';
        }
    },



    ready: function() {
        //do something here when elements loaded
    },

    methods: 
    {

        search: function(e) 
        {
            e.preventDefault();
            this.fetchApi(this.inputField);
        },

        fetchApi: function(input) {
            $("#searchForm").addClass("loading");
            this.$http.get('http://nb2737.swu.stanzwerk.ch:5000/getHostnameByName/'+input, function(output) {
                this.$set('output', output);

                this.getGender(output.username);

                var searchForm = $("#searchForm");
                setTimeout(function() {
                    searchForm.removeClass('loading');
                }, 500);
            });
        },

        isEmpty: function(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        },

        getGender: function(name) {
            this.$http.get('https://api.genderize.io/?name='+name.split(" ")[1], function(gender){
                this.$set('gender', gender.gender);
            });
        }

    },



});