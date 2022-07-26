(function ($) {
  let hotel_list = new Vue({
    el: "#app",
    data: {
      first_time: false,
      attributes: [],
      checked_attributes: {},
      hotels: [],
      displayed_hotels: [],
      locations: [],
      language: "en",
      sorting_method: "recommended",
    },
    created: function () {
      console.log("new vue element created");
      const me = this;
      me.init();
      console.log("initialized");
    },
    mounted() {
      // pass
    },

    computed: {
      // pass
    },

    methods: {
      init: async function () {
        const me = this;

        if (!me.first_time) {
          const api_url = "https://worktel.mrhost.com.tw/api/searchHotels";
          const resp = await fetch(api_url).then((res) => res.json());
          const current_lang = window.location.href.slice(-2);

          if (current_lang === "zh") {
            // mandarin chinese
            me.language = "zh";
          } else if (current_lang === "ja") {
            // japanese
            me.language = "ja";
          } else {
            // default to english for unknown languages
            me.language = "en";
          }
          me.hotels = resp.hotels.data;
          me.displayed_hotels = [...me.hotels];
          me.attributes = resp.attributes;
          me.locations = resp.locations;
          me.first_time = true;
          console.log(resp);
        } else {
          return;
        }
      },

      toggle_collapse: function (event) {
        let target = event.target.dataset.target;
        const elem = document.getElementById(target);

        if (elem.className === "collapse") {
          elem.className = "collapse show";
        } else {
          elem.className = "collapse";
        }
        // console.log(elem);
      },

      sort_hotels: function () {
        this.handle_active_btn_group();
        // this.filter_hotels();
        let tmp_hotels = [...this.displayed_hotels];
        if (this.sorting_method === "recommended") {
          // tmp_hotels = [...this.hotels];
          this.displayed_hotels = [...tmp_hotels];
        } else {
          tmp_hotels = tmp_hotels.sort((a, b) => {
            if (this.sorting_method === "price_low_high")
              return a.price - b.price;
            else if (this.sorting_method === "price_high_low")
              return b.price - a.price;
            else if (this.sorting_method === "rating_high_low")
              return b.rate - a.rate;
          });
          this.displayed_hotels = [...tmp_hotels];
        }
      },
      filter_hotels: function () {
        // this.sort_hotels();
        let tmp_hotels = [...this.hotels];
        // let all_false = true;
        // for (let attr in this.checked_attributes) {
        //   if (this.checked_attributes[attr] === true) {
        //     console.log(this.checked_attributes[attr], attr);
        //     all_false = false;
        //     break;
        //   }
        // }
        // if (all_false) {
        //   this.displayed_hotels = [...this.hotels];
        //   this.sorting_method = "recommended";
        //   return;
        // }
        // console.log("tmp_hotels are", tmp_hotels);
        tmp_hotels = tmp_hotels.filter((hotel) => {
          let all_attributes = [
            ...hotel.terms_by_facility,
            ...hotel.terms_by_type,
          ];
          let passed = true;

          for (let attribute in this.checked_attributes) {
            if (
              this.checked_attributes[attribute] &&
              !all_attributes.find((attr) => attr.id.toString() === attribute)
            ) {
              passed = false;
              break;
            }
          }
          return passed;
        });
        // console.log("found hotels are ", tmp_hotels);
        this.displayed_hotels = [...tmp_hotels];
      },

      default_url_alt: function (event) {
        event.target.src = "https://via.placeholder.com/300x150";
      },

      handle_active_btn_group: function () {
        // Brute force it my brother

        const btn_groups = document
          .getElementById("filter-section")
          .getElementsByTagName("label");

        for (let elem of btn_groups) {
          if (
            elem.getElementsByTagName("input")[0].value === this.sorting_method
          ) {
            // console.log(elem);
            elem.classList.add("active");
          } else {
            elem.classList.remove("active");
          }
        }
      },
    },
  });
})(jQuery);
