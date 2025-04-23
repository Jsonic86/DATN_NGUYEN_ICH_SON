import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  selectedCategory: string = 'pc';  // Mặc định chọn 'pc'
  outstandingItems: any[] = [
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    },
    {
      productName: 'PC Gaming X II 620S',
      price: 30000000,
    }
  ];
  // Mảng ảnh cho từng danh mục
  categories: any = {
    pc: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_5220_pc_gaming_x_ii_620s_ha1.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5597_pc_anubis_lt720_ram_d4_14900k_ha1.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_2702_pc_gaming_x_ii_620s_ha1.jpg"
      }
    ],
    laptop: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_5808_titan_18_hx_ai_a2xwig_090vn_ha1.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5806_msi_vector_16_hx_ai_a2xwig_ha1s.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_5653_dell_inspiron_14_ha5.jpg"
      }
    ],
    card: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_147_nvidia_quadro_p2000_01.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5689_rtx_5080_aero_oc_sff_16g_ha_.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_5617_prime_rtx5080_16g_ha5.jpg"
      }
    ]
  };
  categoriesItem: any = {
    pc: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_5220_pc_gaming_x_ii_620s_ha1.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5597_pc_anubis_lt720_ram_d4_14900k_ha1.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_2702_pc_gaming_x_ii_620s_ha1.jpg"
      }
    ],
    laptop: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_5328_dell_g15_5530_ha1.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5652_dell_inspiron_14_ha5.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_5327_msi_katana_15_ha1.jpg"
      }
    ],
    card: [
      {
        id: 1,
        url: "https://hoanghapccdn.com/media/product/250_5618_prime_rtx5080_o16g_ha2.jpg"
      },
      {
        id: 2,
        url: "https://hoanghapccdn.com/media/product/250_5689_rtx_5080_aero_oc_sff_16g_ha_.jpg"
      },
      {
        id: 3,
        url: "https://hoanghapccdn.com/media/product/250_5620_tuf_rtx5080_o16g_gaming_ha5.jpg"
      }
    ]

  };
  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#homeCarousel');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000, // Thời gian chuyển đổi giữa các slide (3000ms = 3 giây)
        ride: 'carousel', // Khởi động carousel ngay khi trang load
        pause: false, // Không dừng lại khi hover vào
        wrap: true // Lặp lại carousel khi đến slide cuối
      });
    }

  }

}
