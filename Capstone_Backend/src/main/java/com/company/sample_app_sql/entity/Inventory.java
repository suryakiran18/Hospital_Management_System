package com.company.sample_app_sql.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Inventory")
public class Inventory {

    @Id
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Category")
    private String category;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

}
