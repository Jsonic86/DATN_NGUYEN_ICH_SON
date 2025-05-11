import { AfterViewInit, Component } from '@angular/core';
import { StatusResponse } from 'src/app/core/const/constant';
import { ProductService } from 'src/app/services/product.service';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  selectedCategory: string = 'pc';
  selectedCategoryBottom: string = 'cpu';
  outstandingId: string[] = ['125', '225', '633', '1817', '1532', '962', '253', '445', '789'];
  outstandingItems: any[] = [

  ];
  // Mảng ảnh cho từng danh mục
  categories: any = {
    pc: [
      {
        id: 79,
        url: "https://hoanghapccdn.com/media/product/250_5597_pc_anubis_lt720_ram_d4_14900k_ha1.jpg"
      },
      {
        id: 74,
        url: "https://hoanghapccdn.com/media/product/250_5220_pc_gaming_x_ii_620s_ha1.jpg"
      },
      {
        id: 84,
        url: "https://hoanghapccdn.com/media/product/250_5734_pc_gaming_x_ii_hyper_212_ha1.jpg"
      }
    ],
    laptop: [
      {
        id: 355,
        url: "https://hoanghapccdn.com/media/product/250_5809_titan_18_hx_ai_a2xwjg_h4.jpg"
      },
      {
        id: 358,
        url: "https://hoanghapccdn.com/media/product/250_5653_dell_inspiron_14_ha5.jpg"
      },
      {
        id: 363,
        url: "https://hoanghapccdn.com/media/product/250_5328_dell_g15_5530_ha1.jpg"
      }
    ],
    card: [
      {
        id: 924,
        url: "https://hoanghapccdn.com/media/product/250_5641_rtx_5090_gaming_oc_32g_ha7.jpg"
      },
      {
        id: 925,
        url: "https://hoanghapccdn.com/media/product/250_5792_inno3d_geforce_rtx_5070_ti_x3_16gb_ha1.jpg"
      },
      {
        id: 933,
        url: "https://hoanghapccdn.com/media/product/250_5766_rtx_5070_ti_16g_vanguard_soc_launch_edition_ha1.jpg"
      }
    ],
    cpu: [
      {
        id: 815,
        url: "https://hoanghapccdn.com/media/product/250_5401_ultra_9_285k_sale_t2_2025_s1.jpg"
      },
      {
        id: 818,
        url: "https://hoanghapccdn.com/media/product/250_4721_cpu_14900k_sale_t12_2023.jpg"
      },
      {
        id: 822,
        url: "https://hoanghapccdn.com/media/product/250_5417_core_ultra_5_245k_sale_t10_2024.jpg"
      }
    ],
    ram: [
      {
        id: 1148,
        url: "https://hoanghapccdn.com/media/product/250_5113_t_create_expert_d4_sale.jpg"
      },
      {
        id: 1147,
        url: "https://hoanghapccdn.com/media/product/250_5040_ddr4_trident_z_rgb_ha1.jpg"
      },
      {
        id: 1142,
        url: "https://hoanghapccdn.com/media/product/250_4747_dominator_titanium_rgb_white_ha1.jpg"
      }
    ],
    gaminggear: [
      {
        id: 1788,
        url: "https://hoanghapccdn.com/media/product/250_5814_k70_pro_blk_rgb_mx_red_ha1.jpg"
      },
      {
        id: 1791,
        url: "https://hoanghapccdn.com/media/product/250_5772_e_dra_eh414w___white.jpg"
      },
      {
        id: 1796,
        url: "https://hoanghapccdn.com/media/product/250_5676_v260_pro_black_ha1s.jpg"
      }
    ]
  };
  categoriesItem: any = {
    pc: [
      {
        id: 133,
        url: "https://hoanghapccdn.com/media/product/250_4953_hhpc_anubis_pro_4fx_ram_black_ha2.jpg"
      },
      {
        id: 129,
        url: "https://hoanghapccdn.com/media/product/250_5177_pc_gaming_x_ii_620s_ha1.jpg"
      },
      {
        id: 103,
        url: "https://hoanghapccdn.com/media/product/250_4953_hhpc_anubis_pro_4fx_ram_black_ha2.jpg"
      }
    ],
    laptop: [
      {
        id: 611,
        url: "https://hoanghapccdn.com/media/product/250_5327_msi_katana_15_ha1.jpg"
      },
      {
        id: 605,
        url: "https://hoanghapccdn.com/media/product/250_5808_titan_18_hx_ai_a2xwig_090vn_ha1.jpg"
      },
      {
        id: 357,
        url: "https://hoanghapccdn.com/media/product/250_5806_msi_vector_16_hx_ai_a2xwig_ha1s.jpg"
      }
    ],
    card: [
      {
        id: 917,
        url: "https://hoanghapccdn.com/media/product/250_147_nvidia_quadro_p2000_01.jpg"
      },
      {
        id: 918,
        url: "https://hoanghapccdn.com/media/product/250_5689_rtx_5080_aero_oc_sff_16g_ha_.jpg"
      },
      {
        id: 919,
        url: "https://hoanghapccdn.com/media/product/250_5617_prime_rtx5080_16g_ha5.jpg"
      }
    ],
    cpu: [
      {
        id: 823,
        url: "https://hoanghapccdn.com/media/product/250_2908_cpu_12600_ha1s.jpg"
      },
      {
        id: 826,
        url: "https://hoanghapccdn.com/media/product/250_695_amd_ryzen_threadripper_3990x.jpg"
      },
      {
        id: 824,
        url: "https://hoanghapccdn.com/media/product/250_3131_cpu_i3_12100f_sale_t1_2025.jpg"
      }
    ],
    ram: [
      {
        id: 1132,
        url: "https://hoanghapccdn.com/media/product/250_4874_ddr5_corsair_vengeance_rgb_ha2.jpg"
      },
      {
        id: 1133,
        url: "https://hoanghapccdn.com/media/product/250_4531_ddr5_corsair_vengeance_rgb_sale.jpg"
      },
      {
        id: 1140,
        url: "https://hoanghapccdn.com/media/product/250_4607_delta_rgb_ddr5_ha1.jpg"
      }
    ],
    gaminggear: [
      {
        id: 1806,
        url: "https://hoanghapccdn.com/media/product/250_5571_asus_rog_strix_impact_iii_black_ha4.jpg"
      },
      {
        id: 1797,
        url: "https://hoanghapccdn.com/media/product/250_4498_wl5022_ha2.jpg"
      },
      {
        id: 1817,
        url: "https://hoanghapccdn.com/media/product/250_5550_cloud_alpha_red_ha1.jpg"
      }
    ]

  };
  constructor(private productService: ProductService) { }
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
    for (let i = 0; i < this.outstandingId.length; i++) {
      {
        this.productService.getById(this.outstandingId[i]).subscribe(res => {
          if (res.code == StatusResponse.OK) {
            this.outstandingItems[i] = res.result;
          }
        })
      }
    }
  }

}
